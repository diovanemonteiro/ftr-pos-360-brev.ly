import { describe, it, expect, beforeEach } from 'vitest'
import { db } from '@/infra/db'
import * as schema from '@/infra/db/schemas'
import { createLink } from './create-link'
import { makeLink } from '@/infra/test/factories/make-link'

describe('createLink', () => {
  beforeEach(async () => {
    await db.delete(schema.links)
  })

  it('should create a link with valid data', async () => {
    const result = await createLink({
      originalUrl: 'https://example.com',
      shortUrl: 'my-link',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.value.originalUrl).toBe('https://example.com')
      expect(result.value.shortUrl).toBe('my-link')
      expect(result.value.accessCount).toBe(0)
    }
  })

  it('should return Left<ShortUrlAlreadyExists> for duplicate shortUrl', async () => {
    await makeLink({ shortUrl: 'existing' })

    const result = await createLink({
      originalUrl: 'https://other.com',
      shortUrl: 'existing',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.name).toBe('ShortUrlAlreadyExists')
    }
  })

  it('should return Left<InvalidShortUrl> for invalid shortUrl format', async () => {
    const result = await createLink({
      originalUrl: 'https://example.com',
      shortUrl: 'invalid url!',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.name).toBe('InvalidShortUrl')
    }
  })

  it('should reject shortUrl with spaces', async () => {
    const result = await createLink({
      originalUrl: 'https://example.com',
      shortUrl: 'has space',
    })

    expect(result.success).toBe(false)
  })
})
