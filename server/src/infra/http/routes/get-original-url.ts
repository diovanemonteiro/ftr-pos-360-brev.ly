import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getOriginalUrl } from '@/app/functions/get-original-url'

export const getOriginalUrlRoute: FastifyPluginAsyncZod = async (app) => {
  app.get('/links/:shortUrl', {
    schema: {
      summary: 'Get the original URL for a given short URL',
      tags: ['links'],
      params: z.object({
        shortUrl: z.string(),
      }),
      response: {
        200: z.object({
          id: z.string(),
          originalUrl: z.string(),
        }),
        404: z.object({ message: z.string() }),
      },
    },
  }, async (request, reply) => {
    const result = await getOriginalUrl({ shortUrl: request.params.shortUrl })

    if (!result.success) {
      return reply.status(404).send({ message: result.error.message })
    }

    return reply.status(200).send(result.value)
  })
}
