-- Inventory CRM — structure dump (MySQL 8+)
-- Import: mysql -u user -p inventory_crm < database/schema.sql

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id VARCHAR(36) NOT NULL,
  title VARCHAR(512) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_orders_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE products (
  id VARCHAR(36) NOT NULL,
  order_id VARCHAR(36) NOT NULL,
  name VARCHAR(512) NOT NULL,
  serial_number VARCHAR(128) NOT NULL,
  type ENUM('monitor', 'laptop', 'storage', 'other') NOT NULL,
  specification VARCHAR(128) NOT NULL,
  status ENUM('free', 'in_repair') NOT NULL,
  condition_state ENUM('new', 'used') NOT NULL,
  price_usd DECIMAL(12, 2) NOT NULL,
  price_uah DECIMAL(14, 2) NOT NULL,
  group_name VARCHAR(512) NOT NULL,
  assignee VARCHAR(256) NULL,
  warranty_start DATE NOT NULL,
  warranty_end DATE NOT NULL,
  image_url VARCHAR(512) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_products_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
  INDEX idx_products_order_id (order_id),
  INDEX idx_products_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
