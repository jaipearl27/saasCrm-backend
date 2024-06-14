import dotenv from 'dotenv'
import express from 'express'
import { mongoConnect } from './src/config/db.js'
import attendeesRouter from './src/routes/attendees.js';
 
dotenv.config();

const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json());

app.use('/api/v1/attendee', attendeesRouter)


app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`)
    mongoConnect();
})