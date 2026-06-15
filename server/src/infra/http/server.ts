import { fastify } from 'fastify'
import { fastifyCors} from "@fastify/cors";
import {env} from "@/env";
import { serializerCompiler, validatorCompiler, hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'

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

server.listen({ port: 3333, host: '0.0.0.0'}).then(() => {
  console.log('HTTP server running on port 3333')
}).catch((err) => {
  console.error('Error starting server:', err)
})