import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { incrementAccess } from '@/app/functions/increment-access'

export const incrementAccessRoute: FastifyPluginAsyncZod = async (app) => {
  app.patch('/links/:id/access', {
    schema: {
      summary: 'Increment the access count for a short url',
      tags: ['links'],
      params: z.object({
        id: z.string(),
      }),
      response: {
        204: z.null(),
        404: z.object({ message: z.string() }),
      },
    },
  }, async (request, reply) => {
    const result = await incrementAccess({ id: request.params.id })

    if (!result.success) {
      return reply.status(404).send({ message: result.error.message })
    }

    return reply.status(204).send()
  })
}
