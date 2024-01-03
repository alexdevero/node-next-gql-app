import validator from 'validator'
import jwt from 'jsonwebtoken'

import { User } from './../../entities/user'

import { MutationResolvers } from '@/generated/graphql'
import { JwtToken } from '@/types/jwt-token'

export default {
  Mutation: <MutationResolvers>{
    login: async (_, input, ctx) => {
      const { em } = ctx

      const email = validator.trim(input.email)
      const password = validator.trim(input.password)
      const emailValid = validator.isEmail(email)
      const passwordValid = !validator.isEmpty(password)

      if (!emailValid || !passwordValid) {
        throw new Error('Invalid email or password')
      }

      const user = await em.findOne(User, { email })

      if (!user) {
        throw new Error('Invalid email or password')
      }

      const jwtTokenInfo: JwtToken = {
        id: user.id,
        email: user.email,
        username: user.username,
        iat: Math.floor(Date.now() / 1000),
        // exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      }
      const token = jwt.sign(jwtTokenInfo, process.env.JWT_SECRET as string, {
        expiresIn: '24h',
      })

      return {
        user,
        token,
      }
    },
  },
}
