import express from 'express'
import routerUser from './routes/user-route';
import colors from 'colors'
import dataBase from './config/database';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv'
import routerProperty from './routes/property-route';
import cookieParser from 'cookie-parser';

dotenv.config();

//DataBase connection
const connectDB = async()=> {
    try {
        await dataBase.authenticate();
        dataBase.sync();
        console.log(colors.blue('Succesfully connection DB'));
        
    } catch (error) {
        console.log(error);
        console.log(colors.red('Not connect to Data Base'));
    }
}

connectDB()

const corsOptions: CorsOptions = {
    origin(requestOrigin, callback) {
        if (process.env.NODE_ENV !== 'production') {
            // Permitir todos en desarrollo/pruebas
            callback(null, true);
        } else if (requestOrigin === process.env.FRONT_URL) {
            callback(null, true);
        } else {
            callback(new Error('Error de conexión... CORS'));
        }
    },
    credentials: true
};


const server = express();
//JSON Available
server.use(express.json())
//Use CORS
server.use(cors(corsOptions));
//Use type cookies
server.use(cookieParser())

//User routes auth
server.use('/auth', routerUser);
//Properties routes
server.use('/property', routerProperty)

export default server;