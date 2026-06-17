import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import {createLink} from "@/app/functions/create-link";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/links", {
    schema: {
      summary: "Create a short url",
      tags: ["links"],
      body: z.object({
        originalUrl: z.string().url(),
        shortUrl: z.string().min(3),
      }),
      response: {
        201: z.object({
          id: z.string(),
          originalUrl: z.string(),
          shortUrl: z.string(),
          accessCount: z.number(),
          createdAt: z.date(),
        }),
        409: z.object({ message: z.string() }),
        422: z.object({ message: z.string() }),
      },
    },
  }, async (request, reply) => {

    const result = await createLink(request.body)

    if (!result.success) {
      if (result.error.name === 'ShortUrlAlreadyExists') {
        return reply.status(409).send({ message: result.error.message })
      }
      return reply.status(422).send({ message: result.error.message })
    }

    return reply.status(201).send(result.value)

  });
};