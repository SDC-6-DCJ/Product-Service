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
CREATE INDEX products_index ON products(id);

CREATE TABLE styles (
    id                SERIAL PRIMARY KEY,
    product_id        SERIAL REFERENCES products (id),
    name              VARCHAR(50),
    sale_price        NUMERIC(6, 2),
    original_price    NUMERIC(11, 2),
    default_style     BOOLEAN
);
CREATE INDEX styles_index ON styles(product_id);

CREATE TABLE related (
    id                  SERIAL PRIMARY KEY,
    current_product_id  SERIAL REFERENCES products (id),
    related_product_id  INTEGER
);
CREATE INDEX related_index ON related(current_product_id);

CREATE TABLE features (
    id             SERIAL PRIMARY KEY,
    product_id     SERIAL REFERENCES products (id),
    feature        VARCHAR(50),
    value          VARCHAR(50)
);
CREATE INDEX features_index ON features(product_id);

CREATE TABLE skus (
    id             SERIAL PRIMARY KEY,
    style_id       SERIAL REFERENCES styles (id),
    size           VARCHAR(10),
    quantity       SMALLINT
);
CREATE INDEX skus_index ON skus(style_id);

CREATE TABLE photos (
    id             SERIAL PRIMARY KEY,
    style_id       SERIAL REFERENCES styles (id),
    url            VARCHAR(2048) NOT NULL,
    thumbnail_url  VARCHAR(2048) NOT NULL
);
CREATE INDEX photos_index ON photos(style_id);

COPY products(id,name,slogan,description,category,default_price)
FROM '/Users/brettaustineastman/workspace/BrettEastman/RFP2212/Product-Service/ETL/data/product.csv'
DELIMITER ',' CSV HEADER;

COPY styles(id,product_id,name,sale_price,original_price,default_style)
FROM '/Users/brettaustineastman/workspace/BrettEastman/RFP2212/Product-Service/ETL/data/styles.csv'
DELIMITER ',' NULL AS 'null' CSV HEADER;

COPY related (id,current_product_id,related_product_id)
FROM '/Users/brettaustineastman/workspace/BrettEastman/RFP2212/Product-Service/ETL/data/related.csv'
DELIMITER ',' CSV HEADER;

COPY features (id,product_id,feature,value)
FROM '/Users/brettaustineastman/workspace/BrettEastman/RFP2212/Product-Service/ETL/data/features.csv'
DELIMITER ',' NULL AS 'null' CSV HEADER;

COPY skus (id,style_id,size,quantity)
FROM '/Users/brettaustineastman/workspace/BrettEastman/RFP2212/Product-Service/ETL/data/skus.csv'
DELIMITER ',' NULL AS 'null' CSV HEADER;

COPY photos (id,style_id,url,thumbnail_url)
FROM '/Users/brettaustineastman/workspace/BrettEastman/RFP2212/Product-Service/ETL/data/photos.csv'
DELIMITER ',' CSV HEADER;
