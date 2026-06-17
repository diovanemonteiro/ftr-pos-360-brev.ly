import { describe, it, expect, beforeEach } from 'vitest'
import { db } from '@/infra/db'
import * as schema from '@/infra/db/schemas'
import { deleteLink } from './delete-link'
import { makeLink } from '@/infra/test/factories/make-link'

describe('deleteLink', () => {
  beforeEach(async () => {
    await db.delete(schema.links)
  })

  it('should delete an existing link by id', async () => {
    const link = await makeLink()

    const result = await deleteLink({ id: link.id })

    expect(result.success).toBe(true)

    const links = await db.select().from(schema.links)
    expect(links).toHaveLength(0)
  })

  it('should return Left<LinkNotFound> for non-existent id', async () => {
    const result = await deleteLink({ id: 'non-existent-id' })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.name).toBe('LinkNotFound')
    }
  })
})
