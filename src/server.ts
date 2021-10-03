import 'reflect-metadata'
import Koa from 'koa'
import cors from '@koa/cors'

import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import { useKoaServer } from 'routing-controllers'

import { config } from './config'
import { DriverController } from './controllers/driver.controller'

const server = new Koa()

// Middleware
server.use(cors())
server.use(json())
server.use(bodyParser())

// Controller
useKoaServer(server, {
  controllers: [DriverController],
  defaults: {
    paramOptions: {
      required: true
    }
  }
})

export default server.listen(config.port)
