---
layout: post
title: Delete Linode Object Storage BASH Script
summary: Use a Bash script to delete the linode objects storage.
# Available categories: abstract, devops, research, resources, startup, tools, tutorials
categories: tutorials
tags: bash linode objectstorage delete
date: 2026-01-01 09:09:09 +0000
---

Use a Bash script to delete the linode objects storage.

For my tests I name it `myscript.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

###############################################################################
# Linode Object Storage (S3 compatible) - Delete ALL objects from a bucket
# using ONLY curl + AWS Signature Version 4.
#
# - Virtual-hosted style: https://<bucket>.<region>.linodeobjects.com/
# - Lists via ListObjectsV2 (paginated)
# - Deletes via DeleteObjects (up to 1000 keys per request)
#
# REQUIRED ENV VARS:
#   LINODE_ACCESS_KEY="..."
#   LINODE_SECRET_KEY="..."
#   LINODE_REGION="eu-central-1"
#   LINODE_BUCKET="efactura"
#
# OPTIONAL:
#   PREFIX="optional/prefix/"
#   REALLY_DELETE=1                # default DRY RUN
#   SIGNING_REGION="eu-central-1"  # if needed try: us-east-1
#
# DEPENDENCIES:
#   curl, openssl, xxd, perl
###############################################################################

: "${LINODE_ACCESS_KEY:?Missing LINODE_ACCESS_KEY}"
: "${LINODE_SECRET_KEY:?Missing LINODE_SECRET_KEY}"
: "${LINODE_REGION:?Missing LINODE_REGION}"
: "${LINODE_BUCKET:?Missing LINODE_BUCKET}"

PREFIX="${PREFIX:-}"
REALLY_DELETE="${REALLY_DELETE:-0}"
SIGNING_REGION="${SIGNING_REGION:-$LINODE_REGION}"

BASE_HOST="${LINODE_BUCKET}.${LINODE_REGION}.linodeobjects.com"
BASE_URL="https://${BASE_HOST}"

# ---------- crypto helpers ----------

hex_clean() { tr -d '\r\n[:space:]'; }

sha256_hex() {
  openssl dgst -sha256 -hex | awk '{print $2}' | hex_clean
}

hmac_sha256_hex_keystr() {
  local key="$1"
  local data="$2"
  printf '%b' "$data" \
    | openssl dgst -sha256 -mac HMAC -macopt "key:${key}" -binary \
    | xxd -p -c 256 \
    | hex_clean
}

hmac_sha256_hex_hexkey() {
  local hexkey
  hexkey="$(printf '%s' "$1" | hex_clean)"
  local data="$2"
  printf '%b' "$data" \
    | openssl dgst -sha256 -mac HMAC -macopt "hexkey:${hexkey}" -binary \
    | xxd -p -c 256 \
    | hex_clean
}

sigv4_signing_key_hex() {
  local secret="$1" datestamp="$2" region="$3" service="$4"
  local kDateHex kRegionHex kServiceHex kSigningHex
  kDateHex="$(hmac_sha256_hex_keystr "AWS4${secret}" "$datestamp")"
  kRegionHex="$(hmac_sha256_hex_hexkey "$kDateHex" "$region")"
  kServiceHex="$(hmac_sha256_hex_hexkey "$kRegionHex" "$service")"
  kSigningHex="$(hmac_sha256_hex_hexkey "$kServiceHex" "aws4_request")"
  printf '%s' "$kSigningHex" | hex_clean
}

# ---------- encoding helpers ----------

urlencode() {
  local s="$1" out="" i c hex
  LC_ALL=C
  for (( i=0; i<${#s}; i++ )); do
    c="${s:i:1}"
    case "$c" in
      [a-zA-Z0-9.~_-]) out+="$c" ;;
      *) printf -v hex '%%%02X' "'$c"; out+="$hex" ;;
    esac
  done
  printf '%s' "$out"
}

xml_escape() {
  local s="$1"
  s="${s//&/&amp;}"
  s="${s//</&lt;}"
  s="${s//>/&gt;}"
  s="${s//\"/&quot;}"
  s="${s//\'/&apos;}"
  printf '%s' "$s"
}

# ---------- XML parsing ----------

extract_keys_from_xml() {
  local xml="$1"
  printf '%s' "$xml" | perl -0777 -ne 'while (m!<Key>(.*?)</Key>!sg) { print "$1\n" }'
}

extract_next_token_from_xml() {
  local xml="$1"
  printf '%s' "$xml" | perl -0777 -ne 'if (m!<NextContinuationToken>(.*?)</NextContinuationToken>!s) { print $1 }'
}

extract_is_truncated_from_xml() {
  local xml="$1"
  printf '%s' "$xml" | perl -0777 -ne 'if (m!<IsTruncated>(.*?)</IsTruncated>!s) { print $1 }'
}

# ---------- SigV4 request ----------
# send_headers: newline-separated "Header-Name: value" that will be sent by curl
# sign_headers: newline-separated "header-name: value" (LOWERCASE) included in CanonicalHeaders + SignedHeaders
aws_request() {
  local method="$1"
  local canonical_uri="$2"
  local canonical_query="$3"
  local payload="${4:-}"
  local send_headers="${5:-}"
  local sign_headers="${6:-}"

  local amzdate datestamp
  amzdate="$(date -u '+%Y%m%dT%H%M%SZ')"
  datestamp="$(date -u '+%Y%m%d')"

  local payload_hash
  payload_hash="$(printf '%s' "$payload" | sha256_hex)"

  # Base signed headers (always)
  local canonical_headers signed_headers
  canonical_headers="host:${BASE_HOST}\n"
  canonical_headers+="x-amz-content-sha256:${payload_hash}\n"
  canonical_headers+="x-amz-date:${amzdate}\n"
  signed_headers="host;x-amz-content-sha256;x-amz-date"

  # Add additional SIGNED headers (already lowercase name)
  if [[ -n "$sign_headers" ]]; then
    while IFS= read -r line; do
      [[ -z "$line" ]] && continue
      local lname value
      lname="${line%%:*}"
      value="${line#*:}"; value="${value# }"
      canonical_headers+="${lname}:${value}\n"
      signed_headers+=";${lname}"
    done <<< "$sign_headers"
  fi

  local canonical_request
  canonical_request="${method}\n${canonical_uri}\n${canonical_query}\n${canonical_headers}\n${signed_headers}\n${payload_hash}"
  local canonical_request_hash
  canonical_request_hash="$(printf '%b' "$canonical_request" | sha256_hex)"

  local algorithm="AWS4-HMAC-SHA256"
  local credential_scope="${datestamp}/${SIGNING_REGION}/s3/aws4_request"
  local string_to_sign
  string_to_sign="${algorithm}\n${amzdate}\n${credential_scope}\n${canonical_request_hash}"

  local signing_key_hex signature
  signing_key_hex="$(sigv4_signing_key_hex "$LINODE_SECRET_KEY" "$datestamp" "$SIGNING_REGION" "s3")"
  signature="$(hmac_sha256_hex_hexkey "$signing_key_hex" "$string_to_sign")"

  local authorization
  authorization="${algorithm} Credential=${LINODE_ACCESS_KEY}/${credential_scope}, SignedHeaders=${signed_headers}, Signature=${signature}"

  local url="${BASE_URL}${canonical_uri}"
  [[ -n "$canonical_query" ]] && url="${url}?${canonical_query}"

  # Build curl -H list for headers to SEND
  local -a curl_h=()
  if [[ -n "$send_headers" ]]; then
    while IFS= read -r line; do
      [[ -z "$line" ]] && continue
      curl_h+=(-H "$line")
    done <<< "$send_headers"
  fi

  if [[ "$method" == "GET" ]]; then
    curl -sS -X GET \
      -H "x-amz-content-sha256: ${payload_hash}" \
      -H "x-amz-date: ${amzdate}" \
      -H "Authorization: ${authorization}" \
      ${curl_h[@]+"${curl_h[@]}"} \
      "$url"
  else
    curl -sS -X "$method" \
      -H "x-amz-content-sha256: ${payload_hash}" \
      -H "x-amz-date: ${amzdate}" \
      -H "Authorization: ${authorization}" \
      ${curl_h[@]+"${curl_h[@]}"} \
      --data-binary "$payload" \
      "$url"
  fi
}

# ---------- S3 operations ----------

list_objects_page() {
  local token="${1:-}"
  local q=""

  # Canonical query string MUST be sorted by parameter name
  if [[ -n "$token" ]]; then
    q+="continuation-token=$(urlencode "$token")&"
  fi
  q+="list-type=2&max-keys=1000"
  if [[ -n "$PREFIX" ]]; then
    q+="&prefix=$(urlencode "$PREFIX")"
  fi

  aws_request "GET" "/" "$q" "" "" ""
}

delete_objects_batch() {
  local -a keys=("$@")
  [[ "${#keys[@]}" -eq 0 ]] && return 0

  local xml="<Delete><Quiet>false</Quiet>"
  local k
  for k in "${keys[@]}"; do
    xml+="<Object><Key>$(xml_escape "$k")</Key></Object>"
  done
  xml+="</Delete>"

  # SEND Content-Type but DO NOT SIGN it (robust across S3-compatible vendors)
  local send_headers
  send_headers=$(
    cat <<EOF
Content-Type: application/xml
EOF
  )

  local resp
  resp="$(aws_request "POST" "/" "delete=" "$xml" "$send_headers" "")"

  if printf '%s' "$resp" | grep -q '<Error>'; then
    echo "DeleteObjects response contains errors:"
    printf '%s\n' "$resp" | head -n 200
    exit 1
  fi
}

# ---------- main ----------

echo "Endpoint:       ${BASE_URL}"
echo "Bucket:         ${LINODE_BUCKET}"
echo "Prefix:         ${PREFIX:-<none>}"
echo "Signing region: ${SIGNING_REGION}"
echo "Mode:           $([[ "$REALLY_DELETE" == "1" ]] && echo "DELETE" || echo "DRY RUN")"
echo

all_count=0
page=0
token=""

while :; do
  page=$((page + 1))
  echo "Listing page ${page}..."
  xml="$(list_objects_page "$token")"

  if printf '%s' "$xml" | grep -q '<Error>'; then
    echo "ERROR response from server:"
    printf '%s\n' "$xml" | head -n 120
    echo
    echo "If this is SignatureDoesNotMatch, try: SIGNING_REGION=us-east-1"
    exit 1
  fi

  keys_text="$(extract_keys_from_xml "$xml" || true)"

  page_keys=()
  while IFS= read -r line; do
    [[ -n "$line" ]] && page_keys+=("$line")
  done <<< "$keys_text"

  if [[ "${#page_keys[@]}" -gt 0 ]]; then
    all_count=$((all_count + ${#page_keys[@]}))

    if [[ "$REALLY_DELETE" != "1" ]]; then
      printf 'Would delete (%d):\n' "${#page_keys[@]}"
      printf '  %s\n' "${page_keys[@]}"
    else
      echo "Deleting ${#page_keys[@]} objects from page ${page}..."
      i=0
      while [[ $i -lt ${#page_keys[@]} ]]; do
        chunk=( "${page_keys[@]:i:1000}" )
        delete_objects_batch "${chunk[@]}"
        i=$((i + 1000))
        echo "  Deleted batch up to index ${i} (page ${page})"
      done
    fi
  else
    echo "No objects found on this page."
  fi

  truncated="$(extract_is_truncated_from_xml "$xml" || true)"
  next="$(extract_next_token_from_xml "$xml" || true)"

  if [[ "$truncated" == "true" && -n "$next" ]]; then
    token="$next"
    echo
  else
    break
  fi
done

echo
echo "Done."
echo "Total objects matched: ${all_count}"
if [[ "$REALLY_DELETE" != "1" ]]; then
  echo "Nothing was deleted (DRY RUN). To delete for real, run with: REALLY_DELETE=1"
fi
```

You can run a dry test just to preview firstly without deleting the entire bucket:

```bash
REALLY_DELETE=0 myscript.sh
```

Complete script to delete

```bash
REALLY_DELETE=1 LINODE_ACCESS_KEY=CHANGE_ME LINODE_SECRET_KEY=CHANGE_ME LINODE_REGION=CHANGE_ME LINODE_BUCKET=CHANGE_ME LINODE_ENDPOINT=https://eu-central-1.linodeobjects.com bash myscript.sh
```
