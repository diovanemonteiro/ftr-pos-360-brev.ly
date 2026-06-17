import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/links", {
    schema: {
      summary: "Create a new link",
      tags: ["links"],
      body: {
        type: "object",
        properties: {
          url: {
            type: "string",
            format: "uri"
          },
          description: {
            type: "string"
          },
        },
        required: ["url"],
      },
      response: {
        201: {
          description: "Link created successfully",
        },
      },
    },
  }, async (request, reply) => {
    return reply.status(201).send();
  });
};