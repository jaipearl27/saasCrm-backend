import express from 'express';
import { adminSignup } from '../controller/auth.js';

const authRouter = express.Router()

authRouter.route('/admin/signup').post(adminSignup)

export default authRouter