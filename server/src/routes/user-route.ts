import { body } from 'express-validator'
import Router from 'express'
import { UserController } from '../controllers/User-controller';
import { handleErrors } from '../middleware/ErrorsRequest';

const routerUser = Router();

routerUser.post('/login', UserController.loginUser)
routerUser.get('/me', UserController.currentUser);
routerUser.post('/logout', UserController.logoutUser);

//Recover Password
routerUser.post('/password', UserController.recoverPassword)
//Reset user password
routerUser.get('/newpass/reset/:token',UserController.resetPassword)
//Change password
routerUser.post('/change/password/:token', 
    //Validate
    body('new_password').notEmpty().withMessage('Please create a password.').isLength({ min: 6 }).withMessage('Your password must be at least 6 characters long.'),
    body('new_repeat_password').notEmpty().withMessage('Please confirm your password.').custom((v, { req }) => v === req.body.new_password || Promise.reject('Passwords do not match.')),
    //Middleware
    handleErrors,
    UserController.newPassword
)

//Register user
routerUser.post('/register',
    //Validation
    body('name').notEmpty().withMessage('The name is required'),
    body('email').notEmpty().withMessage('The email is required').isEmail().withMessage('Please enter a valid email address.'),
    body('password').notEmpty().withMessage('Please create a password.').isLength({ min: 6 }).withMessage('Your password must be at least 6 characters long.'),
    body('repeat_password').notEmpty().withMessage('Please confirm your password.').custom((v, { req }) => v === req.body.password || Promise.reject('Passwords do not match.')),
    //Middelware
    handleErrors,
    //Controller
    UserController.registerUser
)
//Confirm user
routerUser.get('/confirm/:token',UserController.confirmedAccount)

export default routerUser;