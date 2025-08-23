import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config();

export const generateJWT = (id: string) => jwt.sign({ id }, `${process.env.JWT_SECRET}`, { expiresIn: '1d' })

export const verifyJWT = (token: string): { id: string } => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    return decoded;
}

export const generateID = () => {
    return Math.random().toString(32).substring(2) + Date.now().toString(32);
}