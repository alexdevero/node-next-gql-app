import { MutationResolvers } from '@/generated/graphql'

export default {
  Mutation: <MutationResolvers>{
    logout: async () => true,
  },
}
