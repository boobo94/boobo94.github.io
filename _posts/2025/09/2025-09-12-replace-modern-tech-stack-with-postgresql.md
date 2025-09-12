---
layout: post
title: "Replacing the Modern Tech Stack with PostgreSQL"
date: 2025-09-12 10:00:00 +0300
categories: abstract
tags: [postgresql, fullstack, libraries]
summary: "Can you replace your entire tech stack with PostgreSQL? A breakdown of Fireship's video exploring Postgres extensions and features."
---

I recently watched [Fireship’s video](https://youtu.be/3JW732GrMdg?si=7QJOXUgou0zC_w_-) about how he replaced his entire tech stack with PostgreSQL. The main idea? **Most of what we over-engineer into separate services can actually be handled by Postgres plus its extensions.**

---

## 🎯 The Core Idea

Modern web stacks often look bloated: Redis for caching, Elasticsearch for search, Kafka for streams, Firebase for realtime, separate auth service, separate analytics DB, and more.

But with PostgreSQL, you can cover **~90% of those needs** directly. That means:

- **Less complexity**
- **Fewer moving parts**
- **Lower costs**
- **Simpler architecture**

---

## ⚙️ What PostgreSQL Can Do

Here’s how Postgres (plus its ecosystem) replaces common tools:

| Use-Case               | Postgres Alternative                                                           |
| ---------------------- | ------------------------------------------------------------------------------ |
| **Unstructured data**  | JSON/JSONB types for objects & arrays                                          |
| **Scheduled jobs**     | [`pg_cron`](https://github.com/citusdata/pg_cron) for SQL scheduling           |
| **Caching**            | _Unlogged tables_ as in-memory cache with TTL logic                            |
| **Vector search / AI** | [`pgvector`](https://github.com/pgvector/pgvector) for embeddings & similarity |
| **Full-text search**   | Built-in `tsvector` + inverted indexes                                         |
| **API layer**          | GraphQL/REST auto-exposed from Postgres                                        |
| **Realtime sync**      | Notify clients of DB changes without extra infra                               |
| **Authentication**     | JWT, row-level security, password hashing                                      |
| **Analytics**          | Time-series + column store extensions                                          |

---

## ⚠️ When Not To Do It

Just because you _can_ doesn’t always mean you _should_. Fireship notes some caveats:

- Dedicated tools may scale better for extreme workloads
- Performance trade-offs exist (e.g. Redis is faster for caching)
- Write-heavy systems need careful benchmarking
- Durability vs. speed (unlogged tables skip WAL logging)

---

## ✅ Conclusion

You **can build an entire full-stack app on PostgreSQL**. From structured & unstructured storage to search, caching, jobs, realtime sync, auth, analytics, and even AI workloads — Postgres covers it all.

This approach may not replace every specialized tool in every scenario, but it’s a strong reminder:

> _Sometimes, fewer moving parts is the smartest architecture._

---

💡 Have you tried replacing parts of your stack with Postgres extensions?
