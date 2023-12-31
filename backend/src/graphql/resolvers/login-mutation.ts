import { MutationResolvers } from '@/generated/graphql'

export default {
  Mutation: <MutationResolvers>{
    login: async () => {
      return {
        user: {
          id: '1',
          username: 'bob',
          email: 'foo@email.com',
          createdAt: new Date().toISOString(),
        },
        token: 'token',
      }
    },
  },
}
