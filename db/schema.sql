DROP DATABASE IF EXISTS product_services;
CREATE DATABASE product_services;
\c product_services;

DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS related CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS skus CASCADE;
DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE products (
    id                  SERIAL PRIMARY KEY,
    name                VARCHAR(50),
    slogan              TEXT,
    description         TEXT,
    category            VARCHAR(50),
    default_price       NUMERIC(9, 2),
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE styles (
    id                SERIAL PRIMARY KEY,
    product_id        SERIAL REFERENCES products (id),
    name              VARCHAR(50),
    sale_price        NUMERIC(5, 2) NULL,
    original_price    NUMERIC(11, 2),
    default_style     BOOLEAN
);

CREATE TABLE related (
    id                  SERIAL PRIMARY KEY,
    current_product_id  SERIAL REFERENCES products (id),
    related_product_id  INTEGER
);

CREATE TABLE features (
    id             SERIAL PRIMARY KEY,
    product_id     SERIAL REFERENCES products (id),
    feature        VARCHAR(50),
    value          VARCHAR(50)
);

CREATE TABLE skus (
    id             SERIAL PRIMARY KEY,
    style_id       SERIAL REFERENCES styles (id),
    size           VARCHAR(10),
    quantity       SMALLINT
);

CREATE TABLE photos (
    id             SERIAL PRIMARY KEY,
    style_id       SERIAL REFERENCES styles (id),
    url            TEXT,
    thumbnail_url  TEXT
);

COPY products(id,name,slogan,description,category,default_price)
FROM '/Users/brettaustineastman/workspace/BrettEastman/RFP2212/Product-Service/data/product.csv'
DELIMITER ','
CSV HEADER;
