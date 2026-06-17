import { eq } from 'drizzle-orm'
import { db } from '@/infra/db'
import * as schema from '@/infra/db/schemas'
import { type Either, left, right } from '@/infra/shared/either'
import { LinkNotFound } from './errors/link-not-found'

interface GetOriginalUrlInput {
  shortUrl: string
}

interface GetOriginalUrlOutput {
  id: string
  originalUrl: string
}

export async function getOriginalUrl(
  input: GetOriginalUrlInput
): Promise<Either<LinkNotFound, GetOriginalUrlOutput>> {
  const { shortUrl } = input

  const [link] = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))
    .limit(1)

  if (!link) {
    return left(new LinkNotFound())
  }

  return right({ id: link.id, originalUrl: link.originalUrl })
}
