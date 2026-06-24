import { count, desc } from 'drizzle-orm'
import { db } from '@/infra/db'
import * as schema from '@/infra/db/schemas'
import { type Either, right } from '@/infra/shared/either'
import { z } from 'zod'

const getLinksInput = z.object({
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(20),
})

type GetLinksInput = z.input<typeof getLinksInput>

interface GetLinksOutput {
  links: {
    id: string
    originalUrl: string
    shortUrl: string
    accessCount: number
    createdAt: Date
  }[]
  total: number
}

export async function getLinks(
  input: GetLinksInput = {}
): Promise<Either<never, GetLinksOutput>> {

  const { page = 1, pageSize = 20 } = getLinksInput.parse(input)
  const offset = (page - 1) * pageSize

  const [links, [{ total }]] = await Promise.all([
    db
      .select()
      .from(schema.links)
      .orderBy(schema.links.createdAt)
      .limit(pageSize)
      .offset(offset),
    db.select({ total: count() }).from(schema.links),
  ])

  return right({ links, total: Number(total) })
}
