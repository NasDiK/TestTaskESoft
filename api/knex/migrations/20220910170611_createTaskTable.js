/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tasks',(table)=>{
     table.increments();
     table.string('caption');
     table.string('description');
     table.date('createdAt');
     table.date('endsAt');
     table.date('refreshedAt');
     table.string('priority');
     table.string('status');
     table.integer('Fk_createdBy_id').references('id').inTable('users');
     table.integer('Fk_responsible_id').references('id').inTable('users');

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
