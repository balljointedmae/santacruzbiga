import * as fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

// Create a http server. We pass the relevant typings for our http version used.
// By passing types we get correctly typed access to the underlying http objects in routes.
// If using http2 we'd pass <http2.Http2Server, http2.Http2ServerRequest, http2.Http2ServerResponse>
// For https pass http2.Http2SecureServer or http.SecureServer instead of Server.
const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: true })

const opts: fastify.RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}

server.get('/ping', opts, (request, reply) => {
  console.log(reply.res) // this is the http.ServerResponse with correct typings!
  reply.code(200).send({ pong: 'it worked!' })
})

server.listen(3000, (err, address) => {
    if (err) throw err
    console.info(`server listening on ${address}`)
  })