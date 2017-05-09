/* eslint-disable no-console */

import * as m from './middlewares'
import { HOST, PORT, isDev, signal } from '../../webpack/env'
import compression from 'compression'
import express from 'express'

const app = express()

//
// Express Configuration
// -----------------------------------------------------------------------------

// disable x-powered-by header
app.disable('x-powered-by')

// Compression
if (isDev) app.enable('trust proxy')
else app.use(compression())

// I. Static Assets
m.staticMiddleware(app)
// II. API
m.apiMiddleware(app)
// III. Views
m.viewMiddleware(app)

//
// Initialise Express
// -----------------------------------------------------------------------------

app.listen(PORT, (err) => {
  if (err) return console.error('[server.js]: Error: ', err)

  return console.log(`${signal} http://%s:%s`, HOST, PORT)
})
