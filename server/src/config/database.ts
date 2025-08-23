import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import User from '../models/User.model'
import Property from '../models/Property.model'

dotenv.config()

const dataBase = new Sequelize(`${process.env.DB_URL}`, {
    dialectOptions: {
        ssl: {
            require: false
        }
    },
    models: [User, Property]
})

export default dataBase