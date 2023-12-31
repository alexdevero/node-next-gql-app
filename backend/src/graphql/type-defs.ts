import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { typeDefs as scalarTypeDefs } from 'graphql-scalars'
import path from 'path'

const typesArray = loadFilesSync(path.join(__dirname, './types'), { recursive: true })

export const typeDefs = mergeTypeDefs([...scalarTypeDefs, ...typesArray])
