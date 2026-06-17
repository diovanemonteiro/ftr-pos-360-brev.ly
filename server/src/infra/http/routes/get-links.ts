import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getLinks } from '@/app/functions/get-links'

export const getLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get('/links', {
    schema: {
      querystring: z.object({
        page: z.coerce.number().min(1).default(1),
        pageSize: z.coerce.number().min(1).max(100).default(20),
      }),
      response: {
        200: z.object({
          links: z.array(z.object({
            id: z.string(),
            originalUrl: z.string(),
            shortUrl: z.string(),
            accessCount: z.number(),
            createdAt: z.date(),
          })),
          total: z.number(),
        }),
      },
    },
  }, async (request, reply) => {
    const result = await getLinks(request.query)
    return reply.status(200).send(result.value)
  })
}
