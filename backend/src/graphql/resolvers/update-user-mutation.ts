import validator from 'validator'
import jwt from 'jsonwebtoken'

import { MutationResolvers } from '@/generated/graphql'
import { JwtToken } from '@/types/jwt-token'

export default {
  Mutation: <MutationResolvers>{
    updateUser: async (_, input, { em, req }) => {
      const authorization = req.headers.authorization ?? ''

      let payload: string | JwtToken
      try {
        payload = jwt.verify(
          authorization,
          process.env.JWT_SECRET as string,
        ) as JwtToken
      } catch (error) {
        throw new Error('Not authenticated')
      }

      if (input.email) {
        const emailValid = validator.isEmail(input.email)

        if (!emailValid) {
          throw new Error('Invalid email')
        }
      }

      if (input.username) {
        const usernameValid = !validator.isEmpty(input.username)

        if (!usernameValid) {
          throw new Error('Invalid username')
        }
      }

      if (input.password) {
        const passwordValid = !validator.isEmpty(input.password)

        if (!passwordValid) {
          throw new Error('Invalid password')
        }
      }

      const user = await em.findOne('User', { id: payload.id })

      if (!user) {
        throw new Error('Not authenticated')
      }

      const updatedUser = await em.assign(user, input)

      return updatedUser
    },
  },
}
