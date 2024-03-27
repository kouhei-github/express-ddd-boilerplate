import 'reflect-metadata'
import express from "express"
import cors from "cors"
import * as http from 'http'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import mySequelize from './db'
import {injection} from './di'
// データベースに接続

const app = express()
app.use(cors({
  credentials: true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

// Dependency Injection
const router = injection()

app.use("/api/", router.register())

const server = http.createServer(app)

mySequelize.sync().then(() => {
  server.listen(8000, () => {
    console.log("Server running!")
  })
})
