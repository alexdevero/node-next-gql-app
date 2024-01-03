import jwt from 'jsonwebtoken'

import { QueryResolvers } from '@/generated/graphql'

import { User } from './../../entities/user'
import { JwtToken } from '@/types/jwt-token'

export default {
  Query: <QueryResolvers>{
    me: async (_, __, ctx) => {
      const {
        em,
        req: { headers },
      } = ctx
      const authorization = headers.authorization ?? ''

      let payload: string | JwtToken
      try {
        payload = jwt.verify(
          authorization,
          process.env.JWT_SECRET as string,
        ) as JwtToken
      } catch (error) {
        throw new Error('Not authenticated')
      }

      const currentUser = await em.findOne(User, { id: payload.id })

      if (!currentUser) {
        throw new Error('Not authenticated')
      }

      return currentUser
    },
  },
}
