import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config()

const bdname = process.env.BDNAME;
const usuario = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = process.env.PORTDB;

const db = new Sequelize(bdname, usuario, password, {
    host: host,
    dialect: "postgres",
    port: +port,
    logging: false,
    models: [__dirname + '/../models/**/*.ts']
})

export default db