import { NextFunction, Request, Response } from "express"
import User from "../models/User.model"
import { emailRecoverPassword, emailRegister } from "../helpers/email"
import { generateJWT, generateID, verifyJWT } from "../helpers/token"

interface RequestWithCookies extends Request {
    cookies: { [key: string]: string };
}

export class UserController {

    // LOGIN USER
    static loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({ error: 'This user not exist' });
        if (!user.confirmed) return res.status(400).json({ error: 'User not confirm' });

        const isValid = await user.validatedPassword(password);
        if (!isValid) return res.status(400).json({ error: 'Invalid credentials' });

        const token = generateJWT(user.id);

        return res.cookie('_token', token, {
            httpOnly: true,
            sameSite: 'lax',
        }).json({ message: 'Login successful' });
    };

    // CHECK IF USER IS LOGGED IN
    static currentUser = async (req: RequestWithCookies, res: Response) => {
        try {
            const token = req.cookies._token;
            if (!token) return res.status(401).json({ error: 'No token' });

            const decoded = verifyJWT(token);
            const user = await User.findByPk(decoded.id);
            if (!user) return res.status(404).json({ error: 'User not found' });

            return res.json({ user: { id: user.id, email: user.email }, loggedIn: true });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
    };

    // LOGOUT USER
    static logoutUser = async (req: Request, res: Response) => {
        return res.cookie('_token', '', { httpOnly: true, expires: new Date(0) })
            .json({ message: 'Logged out' });
    };

    //RECOVER PASS CONTROLLER
    static recoverPassword = async (req: Request, res: Response) => {
        try {
            //Validated user exist
            const userExist = await User.findOne({ where: { email: req.body.email } })

            if (!userExist) {
                return res.status(400).json({ error: 'This email not exist' })
            }

            //Generate new token
            userExist.token = generateID();
            await userExist.save();

            //Send email
            emailRecoverPassword(userExist.email, userExist.name, userExist.token)

            //Reedirect to success revocer
            return res.status(200).json({ message: "Email validated success" })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: 'Error to recover password' })
        }
    }

    //RESET PASS CONTROLLER
    static resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.params;

        //Verify token
        const user = await User.findOne({ where: { token } })
        if (!user) {
            return res.redirect(`${process.env.FRONT_URL}/password/reset/error`)
        }

        return res.redirect(`${process.env.FRONT_URL}/password/reset/success/${token}`)
    }

    //CHANGE AND SAVE NEW PASSWORD
    static newPassword = async (req: Request, res: Response) => {

        const { token } = req.params;
        const { new_password } = req.body

        //Indetify user
        const user = await User.findOne({ where: { token } })
        if (!user) {
            return res.status(404).json({ error: 'The user not exist' })
        }

        //Update pass and token
        user.password = new_password;
        user.token = '';
        await user.save();

        return res.json({ message: 'Password updated successfully' });
    }

    //REGISTER CONTROLLER
    static registerUser = async (req: Request, res: Response) => {

        try {
            const userExist = await User.findOne({ where: { email: req.body.email } })

            if (userExist) {
                return res.status(400).json({ error: 'This email has been used' })
            }

            const user = await User.create(req.body);
            emailRegister(user.email, user.name, user.token);
            return res.json({ message: 'User created succesfull' })

        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: 'Error to create new user' })
        }

    }

    //CONFIRMED CONTROLLER
    static confirmedAccount = async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.params;

        //Verify token
        const user = await User.findOne({ where: { token } })
        if (!user) {
            return res.redirect(`${process.env.FRONT_URL}/confirm/error`)
        }
        //Confirm Account
        user.confirmed = true;
        user.token = "";
        await user.save();

        return res.redirect(`${process.env.FRONT_URL}/confirm/success`)
    }
}