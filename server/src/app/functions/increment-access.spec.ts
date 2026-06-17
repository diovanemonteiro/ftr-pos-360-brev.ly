import { describe, it, expect, beforeEach } from 'vitest'
import { eq } from 'drizzle-orm'
import { db } from '@/infra/db'
import * as schema from '@/infra/db/schemas'
import { incrementAccess } from './increment-access'
import { makeLink } from '@/infra/test/factories/make-link'

describe('incrementAccess', () => {
  beforeEach(async () => {
    await db.delete(schema.links)
  })

  it('should increment accessCount for an existing link', async () => {
    const link = await makeLink()

    const result = await incrementAccess({ id: link.id })

    expect(result.success).toBe(true)

    const [updated] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, link.id))

    expect(updated.accessCount).toBe(1)
  })

  it('should increment accessCount multiple times', async () => {
    const link = await makeLink()

    await incrementAccess({ id: link.id })
    await incrementAccess({ id: link.id })
    await incrementAccess({ id: link.id })

    const [updated] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, link.id))

    expect(updated.accessCount).toBe(3)
  })

  it('should return Left<LinkNotFound> for non-existent id', async () => {
    const result = await incrementAccess({ id: 'non-existent-id' })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.name).toBe('LinkNotFound')
    }
  })
})
