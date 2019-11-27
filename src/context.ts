import * as express from 'express'
import { EntityManager, } from 'mikro-orm'

export interface Context {
  em: EntityManager
  req: express.Request
  res: express.Response
}