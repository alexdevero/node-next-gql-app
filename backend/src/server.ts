import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 5000
const FE_PORT = process.env.FE_PORT || 3000

export const app = express()

export const init = (async () => {
  app.use(cors({
    origin: `http://localhost:${FE_PORT}`,
    credentials: true
  }))
  app.use(cookieParser())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  const server = http.createServer(app)

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
})()
