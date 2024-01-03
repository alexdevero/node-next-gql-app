import validator from 'validator'

import { MutationResolvers } from '@/generated/graphql'

import { User } from './../../entities/user'

export default {
  Mutation: <MutationResolvers>{
    signUp: async (_, input, { em }) => {
      const email = validator.trim(input.email)
      const password = validator.trim(input.password)
      const username = validator.trim(input.username)

      const emailValid = validator.isEmail(email)
      const passwordValid = validator.isLength(password, { min: 6 })
      const usernameValid = validator.isLength(username, { min: 3 })

      if (!emailValid) {
        throw new Error('Invalid email')
      }

      if (!passwordValid) {
        throw new Error('Invalid password')
      }

      if (!usernameValid) {
        throw new Error('Invalid username')
      }

      const user = em.create(User, {
        email,
        password,
        username,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      await em.persistAndFlush(user)

      return {
        user,
      }
    },
  },
}
