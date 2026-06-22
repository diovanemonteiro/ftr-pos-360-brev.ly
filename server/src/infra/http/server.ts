import { fastify } from 'fastify'
import { fastifyCors} from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform
} from 'fastify-type-provider-zod'
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { createLinkRoute } from "@/infra/http/routes/create-link";
import { getLinksRoute } from "@/infra/http/routes/get-links"
import { deleteLinkRoute } from "@/infra/http/routes/delete-link"
import { exportLinksRoute } from "@/infra/http/routes/export-links"
import { getOriginalUrlRoute } from "@/infra/http/routes/get-original-url"
import { incrementAccessRoute } from "@/infra/http/routes/increment-access"
import { runMigrations } from '@/infra/db/migrate'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {

  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation
    })
  }

  console.error('Error handling request:', error)
  reply.status(500).send({ message: 'Internal Server Error' })
})

server.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'URL Shortener API',
      version: '1.0.0',
    },
  },
  transformer: jsonSchemaTransform
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(createLinkRoute)
server.register(getLinksRoute)
server.register(deleteLinkRoute)
server.register(getOriginalUrlRoute)
server.register(incrementAccessRoute)
// server.register(exportLinksRoute)

runMigrations().then(() => {
  server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
    console.log('HTTP server running on port 3333')
  }).catch((err) => {
    console.error('Error starting server:', err)
  })
})