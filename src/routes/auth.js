import express from 'express';
import { login, signup } from '../controller/auth.js';

const authRouter = express.Router()

authRouter.route('/signin').post(login)
authRouter.route('/signup').post(signup)

// authRouter.route('/admin/signup').post(adminSignup)

export default authRouter