import 'reflect-metadata'
import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from '@mikro-orm/core'
import type { PostgreSqlDriver } from '@mikro-orm/postgresql'

import { User } from './entities/user'

dotenv.config()

const PORT = process.env.PORT || 5000
const FE_PORT = process.env.FE_PORT || 3000

export const DI = {} as {
  server: http.Server
  orm: MikroORM
  em: EntityManager
  userRepository: EntityRepository<User>
}

export const app = express()

export const init = (async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>()
  DI.em = DI.orm.em

  app.use(
    cors({
      origin: `http://localhost:${FE_PORT}`,
      credentials: true,
    }),
  )
  app.use(cookieParser())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next))

  DI.server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})()
