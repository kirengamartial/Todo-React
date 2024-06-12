import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()


connectDb()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors({
   origin: 'http://localhost:3000',
   credentials: true 
}))
app.use(cookieParser())
app.use('/api/users', userRoutes)
app.use('/api/todo', todoRoutes)
const PORT = 5000



app.listen(PORT, () => console.log(`App is running on port ${PORT}`))