import { QueryResolvers } from '@/generated/graphql'

import { User } from './../../entities/user'

export default {
  Query: <QueryResolvers>{
    me: async (_, __, ctx, info) => {
      const { em } = ctx

      const currentUser = await em.findOne(User, { id: '1' })
      console.log(info)

      return {
        id: '1',
        username: 'bob',
        email: 'test@email.com',
        createdAt: new Date().toISOString(),
      }
    },
  },
}
