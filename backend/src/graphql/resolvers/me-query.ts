import { QueryResolvers } from '@/generated/graphql'

import { User } from './../../entities/user'

export default {
  Query: <QueryResolvers>{
    me: async (_, __, ctx) => {
      const {
        em,
        req: { user },
      } = ctx

      if (!user) {
        throw new Error('Not authenticated')
      }

      const currentUser = await em.findOne(User, { id: (user as { id: string }).id })

      if (!currentUser) {
        throw new Error('Not authenticated')
      }

      return currentUser
    },
  },
}
