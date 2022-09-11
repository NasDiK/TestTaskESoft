/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    {id: 1, caption: 'Тест задание', description: 'Выполнить тестовое задание', createdAt: '2022-08-09', endsAt: '2022-09-09', refreshedAt: null, priority: 'high', status: 'created', Fk_createdBy_id: 1, Fk_responsible_id: 3},
    {id: 2, caption: 'Задание с ID 2', description: 'Лорем ипсум долор сит амет, консектетур, адипсинг элит...', createdAt: '2022-09-09', endsAt: '2022-09-16', refreshedAt: null, priority: 'medium', status: 'completed', Fk_createdBy_id: 2, Fk_responsible_id: 4},
    {id: 3, caption: 'Третье задание', description: 'I do shake, shake, shake, my fucking ass do money. \nBitch work, work, I twerkin\' on your party', createdAt: '2022-09-10', endsAt: '2022-09-15', refreshedAt: null, priority: 'low', status: 'in process', Fk_createdBy_id: 2, Fk_responsible_id: 4},
    {id: 4, caption: 'Задание четыре', description: 'Набрать молодняк', createdAt: '2022-09-08', endsAt: '2022-09-10', refreshedAt: null, priority: 'high', status: 'cancelled', Fk_createdBy_id: 1, Fk_responsible_id: 2},
  ]);
};
