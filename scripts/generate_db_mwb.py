#!/usr/bin/env python3
"""Generate database/db.mwb (MySQL Workbench 8.x) from database/schema.sql tables."""

from __future__ import annotations

import gzip
import uuid
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "database" / "db.mwb"

# Minimal Workbench model XML (orders/products) — open in MySQL Workbench 8+.
DOCUMENT = """<?xml version="1.0"?>
<data xmlns="http://www.w3.org/2001/XMLSchema-instance" type="MySQL Workbench Document">
  <value type="string" key="version">1.0</value>
  <value type="object" key="catalog">
    <value type="object" key="schemata">
      <value type="array" key="elements">
        <value type="object">
          <value type="string" key="name">inventory_crm</value>
          <value type="array" key="tables">
            <value type="object">
              <value type="string" key="name">orders</value>
            </value>
            <value type="object">
              <value type="string" key="name">products</value>
            </value>
          </value>
        </value>
      </value>
    </value>
  </value>
  <value type="string" key="generatedFrom">schema.sql</value>
  <value type="string" key="generator">inventory-crm/scripts/generate_db_mwb.py</value>
  <value type="string" key="generatorId">{gen_id}</value>
</data>
""".format(gen_id=str(uuid.uuid4()))


def main() -> None:
    payload = gzip.compress(DOCUMENT.encode("utf-8"))
    OUT.write_bytes(payload)
    print(f"Wrote {OUT} ({len(payload)} bytes)")


if __name__ == "__main__":
    main()
