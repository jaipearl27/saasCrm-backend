import express from 'express';
import { createEmployee, login, refreshToken, signup } from '../controller/auth.js';

const authRouter = express.Router()

authRouter.route('/signin').post(login)
authRouter.route('/signup').post(signup)
authRouter.route('/refresh').post(refreshToken)
authRouter.route('/createEmployee').post(createEmployee)


// authRouter.route('/admin/signup').post(adminSignup)

export default authRouter