import { fastify } from 'fastify'
import { fastifyCors} from "@fastify/cors";
import {env} from "@/env";
import {
  serializerCompiler,
  validatorCompiler,
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform
} from 'fastify-type-provider-zod'
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { createLink } from "@/infra/http/routes/create-link";

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
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Link Shortener API',
      version: '1.0.0',
    },
  },
  transformer: jsonSchemaTransform
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(createLink)

server.listen({ port: 3333, host: '0.0.0.0'}).then(() => {
  console.log('HTTP server running on port 3333')
}).catch((err) => {
  console.error('Error starting server:', err)
})