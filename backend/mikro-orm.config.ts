import { Options } from '@mikro-orm/core'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'

import { User } from './src/entities/user'

// Used as a hack to distinguish between running in docker and locally
// If DATABASE_URL is set, we are running in docker
const DB_URL = process.env.DATABASE_URL

const config: Options = {
  entities: [User],
  dbName: 'postgres',
  type: 'postgresql',
  ...(DB_URL
    ? { clientUrl: process.env.DATABASE_URL }
    : { host: 'localhost', port: 5432, password: 'postgres', user: 'postgres' }),
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
}

export default config
