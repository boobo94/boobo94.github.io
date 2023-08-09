---
title: How to find the size of a table in SQL?
summary: Learn how to determine the size of a SQL table with this informative guide. Discover efficient methods for measuring table size.
categories: tutorials
tags: postgresql sql
date: 2023-08-08 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2018/09/20/09/05/assassin-3690300_1280.jpg
layout: post
---

As a SQL developer or database administrator, it is essential to have a good understanding of the size of your database tables. Knowing the size of a table can help you optimize your database performance, plan for storage requirements, and troubleshoot issues related to database performance. In this blog post, we will guide you through the process of finding the size of a table in SQL.

Here's how you can see the size table sizes for **public** schema

```sql
SELECT
	table_name,
	pg_size_pretty(pg_relation_size(quote_ident(table_name))),
	pg_relation_size(quote_ident(table_name))
FROM
	information_schema.tables
WHERE
	table_schema = 'public'
ORDER BY
	3 DESC;
```

See sizes of tables of all schemas:

```sql
SELECT
	schema_name,
	relname,
	pg_size_pretty(table_size) AS size,
	table_size
FROM (
	SELECT
		pg_catalog.pg_namespace.nspname AS schema_name,
		relname,
		pg_relation_size(pg_catalog.pg_class.oid) AS table_size
	FROM
		pg_catalog.pg_class
		JOIN pg_catalog.pg_namespace ON relnamespace = pg_catalog.pg_namespace.oid) t
WHERE
	schema_name NOT LIKE 'pg_%'
ORDER BY
	table_size DESC;
```