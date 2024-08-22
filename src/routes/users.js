import express from "express"
import { getAllUsers } from "../controller/users.js"

const usersRouter = express.Router()

usersRouter.route('/').get(getAllUsers)

export default usersRouter