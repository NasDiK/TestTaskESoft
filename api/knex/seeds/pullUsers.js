const bcrypt = require('bcryptjs');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, lastname: 'Тунгусов', firstname: 'Александр', patronymic: 'Сергеевич', login: 'tungusov', password: bcrypt.hashSync('tungusov',5), chief_id: null},
    {id: 2, lastname: 'Дубровин', firstname: 'Марк', patronymic: 'Иванович', login: 'dubrovin', password: bcrypt.hashSync('dubrovin',5), chief_id: 1},
    {id: 3, lastname: 'Соболев', firstname: 'Максим', patronymic: 'Сергеевич', login: 'sobolev', password: bcrypt.hashSync('sobolev',5), chief_id: 1},
    {id: 4, lastname: 'Максимов', firstname: 'Максим', patronymic: 'Львович', login: 'maksimov', password: bcrypt.hashSync('maksimov',5), chief_id: 2},
    {id: 5, lastname: 'Степанов', firstname: 'Григорий', patronymic: 'Александрович', login: 'stepanov', password: bcrypt.hashSync('stepanov',5), chief_id: 2},
  ]);
};
