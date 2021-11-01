const pgp = require('pg-promise')();
const cn = 'postgres://postgres:12345678@localhost:5432/mrcoffee_schedule_app';
const db = pgp(cn);

module.exports = db;
