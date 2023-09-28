import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("todos", (table) => {
    table.timestamp("createdAt");
    table.integer("userId").references("id").inTable("users");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("todos", (table) => {
    table.dropColumn("createdAt");
    table.dropColumn("userId");
  });
}
