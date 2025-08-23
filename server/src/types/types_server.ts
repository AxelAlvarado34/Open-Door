import { Model } from "sequelize"

export interface UserInstance extends Model {
    name: string,
    email: string,
    password: string,
    confirmed: string,
    token: string,    
}