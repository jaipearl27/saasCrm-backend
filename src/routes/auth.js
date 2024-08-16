import express from 'express';
import { login, refreshToken, signup } from '../controller/auth.js';

const authRouter = express.Router()

authRouter.route('/signin').post(login)
authRouter.route('/signup').post(signup)
authRouter.route('/refresh').post(refreshToken)


// authRouter.route('/admin/signup').post(adminSignup)

export default authRouter