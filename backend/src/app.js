import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { configDotenv } from 'dotenv'

configDotenv({
  path : './.env'
})

const app = express();


const limitOfAllTypes = '16kb'


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials : true
}))

app.use(express.json(
  { limit: limitOfAllTypes }
))

app.use(express.urlencoded({
  extended: true,
  limit : limitOfAllTypes
}))

app.use(express.static('public'))

app.use(cookieParser());


// import router

import authRouter from './routes/user.route.js'

app.use('/edufusion/api/v2/',authRouter)


export default app