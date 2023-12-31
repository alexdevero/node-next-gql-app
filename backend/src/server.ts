import 'reflect-metadata'
import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import dotenv from 'dotenv'
import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from '@mikro-orm/core'
import type { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { v4 } from 'uuid'
import passport from 'passport'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { makeExecutableSchema } from '@graphql-tools/schema'

import { authRouter } from './routes/auth'

import { User } from './entities/user'

import { typeDefs } from './graphql/type-defs'
import { resolvers } from './graphql/resolvers'

dotenv.config()

const PORT = process.env.PORT || 5000
const FE_PORT = process.env.FE_PORT || 3000
const SESSION_SECRET = process.env.session_secret || 'secret'

export const DI = {} as {
  server: http.Server
  orm: MikroORM
  em: EntityManager
  userRepository: EntityRepository<User>
}

passport.serializeUser((user, done) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  done(null, (user as any).id)
})

passport.deserializeUser(async (id: string, done) => {
  const user = await DI.userRepository.findOne({ id })
  done(null, user)
})

export const app = express()

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ em: DI.em, req, res }),
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
})

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
  app.use(
    session({
      genid: () => v4(),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  )
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next))
  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/auth', authRouter)

  await server.start()

  server.applyMiddleware({ app })

  DI.server = app.listen(PORT, () => {
    console.log(
      `Server started on port ${PORT}, GraphQL server at ${server.graphqlPath}`,
    )
  })
})()
