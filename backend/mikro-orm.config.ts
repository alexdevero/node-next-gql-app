import { Options } from '@mikro-orm/core'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'

import { User } from './src/entities/user'

const config: Options = {
  entities: [User],
  dbName: 'postgres',
  type: 'postgresql',
  clientUrl: process.env.DATABASE_URL,
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
}

export default config
