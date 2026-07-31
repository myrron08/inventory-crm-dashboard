# MySQL Workbench model (`db.mwb`)

The relational model matches `schema.sql`:

- **orders** — приходы (1)
- **products** — продукты (N), FK `order_id` → `orders.id` ON DELETE CASCADE

## Create or regenerate `db.mwb`

```bash
python3 scripts/generate_db_mwb.py
```

Or manually in Workbench:

1. Open **MySQL Workbench**.
2. **File → Open SQL Script…** → select `database/schema.sql`.
3. Execute the script on a local instance (or skip execution and use **Database → Reverse Engineer** after creating empty tables).
4. **File → Save Model As…** → save as `database/db.mwb` in this repo.

Alternatively: **File → New Model**, add tables manually from `schema.sql`, then save as `database/db.mwb`.

Commit the generated `db.mwb` after saving from Workbench (binary file).
