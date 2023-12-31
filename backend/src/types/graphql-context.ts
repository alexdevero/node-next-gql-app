import { EntityManager } from '@mikro-orm/core'
import { Request, Response } from 'express'

export interface Context {
  em: EntityManager
  req: Request
  res: Response
}
