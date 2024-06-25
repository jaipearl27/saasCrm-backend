import dotenv from 'dotenv'
import express from 'express'
import { mongoConnect } from './src/config/db.js'
import attendeesRouter from './src/routes/attendees.js';
import cors from 'cors' 

dotenv.config();

const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json());
app.use(
  cors(
    process.env.NODE_ENV === "production"
      ? {
          origin: [
            "http://localhost:5173",
            "http://localhost:5174",
"https://saas-crm-nine.vercel.app"         ],
          methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
          allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
        credentials:false,
        
          maxAge: 600,
          exposedHeaders: ["*", "Authorization"],
        }
      : {
          origin: [
            "http://localhost:5173",
            "http://localhost:5174",
"https://saas-crm-nine.vercel.app"         ],
          methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
          allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
        credentials:false,
        
          maxAge: 600,
          exposedHeaders: ["*", "Authorization"],
        }
  )
);

app.use('/api/v1/attendee', attendeesRouter)


app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`)
    mongoConnect();
})
