import { MutationResolvers } from '@/generated/graphql'

export default {
  Mutation: <MutationResolvers>{
    signUp: async () => {
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
