CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL
);

CREATE TABLE "recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" INTEGER,
  "file_id" INTEGER
);

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "chef_id" int NOT NULL,
  "title" text NOT NULL,
  "ingredients" text NOT NULL,
  "preparation" text NOT NULL,
  "information" text NOT NULL,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "file_id" INTEGER,
  "created_at" timestamp NOT NULL
);

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");

ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");
