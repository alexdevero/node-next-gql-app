import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers } from '@graphql-tools/merge'
import { resolvers as scalarResolvers } from 'graphql-scalars'
import path from 'path'

const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'), {
  extensions: ['ts'],
  recursive: true,
})

export const resolvers = mergeResolvers([scalarResolvers, ...resolversArray])
