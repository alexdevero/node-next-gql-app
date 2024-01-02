import validator from 'validator'

import { User } from './../../entities/user'

import { MutationResolvers } from '@/generated/graphql'

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

      return {
        user,
        // token: 'token',
      }
    },
  },
}
