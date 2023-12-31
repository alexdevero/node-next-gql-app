import { QueryResolvers } from '@/generated/graphql'

export default {
  Query: <QueryResolvers>{
    me: (_, __, ctx, info) => {
      const { em } = ctx

      console.log(info)

      return {
        id: '1',
        name: 'bob',
        email: 'test@email.com',
        createdAt: new Date().toISOString(),
      }
    },
  },
}
