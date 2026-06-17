import { describe, it, expect, beforeEach } from 'vitest'
import { db } from '@/infra/db'
import * as schema from '@/infra/db/schemas'
import { getOriginalUrl } from './get-original-url'
import { makeLink } from '@/infra/test/factories/make-link'

describe('getOriginalUrl', () => {
  beforeEach(async () => {
    await db.delete(schema.links)
  })

  it('should return the original URL for an existing shortUrl', async () => {
    const link = await makeLink({ shortUrl: 'my-short' })

    const result = await getOriginalUrl({ shortUrl: 'my-short' })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.value.originalUrl).toBe(link.originalUrl)
      expect(result.value.id).toBe(link.id)
    }
  })

  it('should return Left<LinkNotFound> for non-existent shortUrl', async () => {
    const result = await getOriginalUrl({ shortUrl: 'does-not-exist' })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.name).toBe('LinkNotFound')
    }
  })
})
