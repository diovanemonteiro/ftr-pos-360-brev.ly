import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { deleteLink } from '@/app/functions/delete-link'

export const deleteLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete('/links/:id', {
    schema: {
      params: z.object({
        id: z.string(),
      }),
      response: {
        204: z.null(),
        404: z.object({ message: z.string() }),
      },
    },
  }, async (request, reply) => {
    const result = await deleteLink({ id: request.params.id })

    if (!result.success) {
      return reply.status(404).send({ message: result.error.message })
    }

    return reply.status(204).send()
  })
}
