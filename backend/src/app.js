import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { configDotenv } from 'dotenv'

configDotenv({
  path : './.env'
})

const app = express();


const limitOfAllTypes = '10mb'


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials : true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(express.json(
  { limit: limitOfAllTypes }
))

app.use(express.urlencoded({ extended: true, limit: limitOfAllTypes }));

app.use(express.static('public'))

app.use(cookieParser());


//  =======================================================
// import router
//  =======================================================
import authRouter from './routes/auth.route.js'


//  =======================================================
// Handle route
//  =======================================================
app.use('/api/v1/edu/auth', authRouter)

export default app
