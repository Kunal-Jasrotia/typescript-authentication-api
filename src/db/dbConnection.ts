import mysql, { Pool, RowDataPacket } from 'mysql2/promise'

export const pool: Pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,

});

export type RowData = RowDataPacket[] | RowDataPacket[][]