import mysql from 'mysql2/promise';

console.log('Menghubungkan ke database...');

const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567890',
    database: 'temujasa'
});

console.log('Database berhasil terhubung.');

export default db;