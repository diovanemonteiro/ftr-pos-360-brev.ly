import { eq, sql } from 'drizzle-orm'
import { db } from '@/infra/db'
import * as schema from '@/infra/db/schemas'
import { type Either, left, right } from '@/infra/shared/either'
import { LinkNotFound } from './errors/link-not-found'

interface IncrementAccessInput {
  id: string
}

export async function incrementAccess(
  input: IncrementAccessInput
): Promise<Either<LinkNotFound, null>> {
  const { id } = input

  const [link] = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.id, id))
    .limit(1)

  if (!link) {
    return left(new LinkNotFound())
  }

  await db
    .update(schema.links)
    .set({ accessCount: sql`${schema.links.accessCount} + 1` })
    .where(eq(schema.links.id, id))

  return right(null)
}
