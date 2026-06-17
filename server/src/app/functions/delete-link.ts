import { eq } from 'drizzle-orm'
import { db } from '@/infra/db'
import * as schema from '@/infra/db/schemas'
import { type Either, left, right } from '@/infra/shared/either'
import { LinkNotFound } from './errors/link-not-found'

interface DeleteLinkInput {
  id: string
}

export async function deleteLink(
  input: DeleteLinkInput
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

  await db.delete(schema.links).where(eq(schema.links.id, id))

  return right(null)
}
