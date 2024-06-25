import dotenv from 'dotenv'
import express from 'express'
import { mongoConnect } from './src/config/db.js'
import attendeesRouter from './src/routes/attendees.js';
import cors from 'cors' 

dotenv.config();

const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json());
app.use(cors(
   {
        origin: ["http://localhost:5173","http://localhost:5174","http://localhost:5010", "https://saas-crm-pi.vercel.app"],
        // credentials: true,
        methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
        exposedHeaders: ["*", "Authorization"],
    }
))
app.use('/api/v1/attendee', attendeesRouter)


app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`)
    mongoConnect();
})