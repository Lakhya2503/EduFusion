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



// import router

import authRouter from './routes/user.route.js'
import couresesRouter from './routes/course.route.js'
import commonRouter from "./routes/common.route.js";

// users ( admin/ teacher/ student )
app.use("/edufusion/api/v2/users", authRouter);

// courses
app.use("/edufusion/api/v2/courses", couresesRouter);

// common
app.use("/edufusion/api/v2", commonRouter);



export default app