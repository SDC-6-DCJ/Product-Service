DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS related CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS skus CASCADE;
DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE IF NOT EXISTS products (
    id                  SERIAL PRIMARY KEY,
    name                VARCHAR(50),
    slogan              TEXT,
    description         TEXT,
    category            VARCHAR(50),
    default_price       int,
    created_at          TIMESTAMP,
    updated_at          TIMESTAMP
);

CREATE TABLE IF NOT EXISTS styles (
    id                SERIAL PRIMARY KEY,
    productId         SERIAL REFERENCES products (id),
    name              VARCHAR(50),
    sale_price        int, //or null?
    original_price    int,
    default_style     BOOLEAN
);

CREATE TABLE IF NOT EXISTS related (
    id                  SERIAL PRIMARY KEY,
    current_product_id  SERIAL REFERENCES products (id),
    related_product_id  int
);

CREATE TABLE IF NOT EXISTS features (
    id             SERIAL PRIMARY KEY,
    product_id     SERIAL REFERENCES products (id),
    feature        VARCHAR(50),
    value          VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS skus (
    id             SERIAL PRIMARY KEY,
    styleId        SERIAL REFERENCES styles (id),
    size           VARCHAR(10),
    quantity       int
);

CREATE TABLE IF NOT EXISTS photos (
    id             SERIAL PRIMARY KEY,
    styleId        SERIAL REFERENCES styles (id),
    url            TEXT,
    thumbnail_url  TEXT
);
