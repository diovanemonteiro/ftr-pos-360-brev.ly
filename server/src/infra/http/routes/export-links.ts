import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { exportLinks } from '@/app/functions/export-links'

export const exportLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.post('/links/exports', {
    schema: {
      summary: 'Export all links as a CSV file',
      tags: ['links'],
      response: {
        200: z.object({
          url: z.string(),
        }),
      },
    },
  }, async (_request, reply) => {
    const result = await exportLinks()
    return reply.status(200).send(result.value)
  })
}
