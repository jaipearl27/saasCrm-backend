import express from 'express';const employeeRouter = express.Router()

employeeRouter.route('/').post(signin)

export default employeeRouter