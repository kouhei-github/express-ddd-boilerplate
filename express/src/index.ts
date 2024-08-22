import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import * as http from 'http'
import 'reflect-metadata'
import { injection } from './di'
import { setPrismaClient } from './infrastructure/datastore/db'

const app = express()
app.use(
  cors({
    credentials: true,
  }),
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

// データベースに接続
const db = setPrismaClient()

// Dependency Injection
const router = injection(db)

// ルーティングの設定
app.use('/api', router.register())

const server = http.createServer(app)

server.listen(8080, () => {
  console.log('Server running!')
})
