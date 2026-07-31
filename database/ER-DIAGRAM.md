# ER Diagram — Inventory CRM

Relational model for MySQL 8+. Matches `schema.sql` and optional `db.mwb`.

## Mermaid

```mermaid
erDiagram
  orders ||--o{ products : contains

  orders {
    varchar id PK
    varchar title
    datetime created_at
  }

  products {
    varchar id PK
    varchar order_id FK
    varchar name
    varchar serial_number
    enum type
    varchar specification
    enum status
    enum condition_state
    decimal price_usd
    decimal price_uah
    varchar group_name
    varchar assignee
    date warranty_start
    date warranty_end
    varchar image_url
    datetime created_at
  }
```

## Cardinality

| Relationship          | Type | On delete |
| --------------------- | ---- | --------- |
| `orders` → `products` | 1:N  | CASCADE   |

## Runtime note

The demo API uses an in-memory store seeded from `apps/server/src/data/seed.ts`. The SQL model documents the production database shape for Workbench and future MySQL integration.

## Workbench model

Open or regenerate `database/db.mwb` in MySQL Workbench from this schema — see [README.md](./README.md).
