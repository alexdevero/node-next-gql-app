import { MutationResolvers } from '@/generated/graphql'

export default {
  Mutation: <MutationResolvers>{
    login: () => {
      return {
        user: {
          id: '1',
          name: 'bob',
          email: 'foo@email.com',
          createdAt: new Date().toISOString(),
        },
        token: 'token',
      }
    },
  },
}
