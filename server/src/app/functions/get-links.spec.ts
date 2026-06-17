import { describe, it, expect, beforeEach } from 'vitest'
import { db } from '@/infra/db'
import * as schema from '@/infra/db/schemas'
import { getLinks } from './get-links'
import { makeLink } from '@/infra/test/factories/make-link'

describe('getLinks', () => {
  beforeEach(async () => {
    await db.delete(schema.links)
  })

  it('should return paginated links with total', async () => {
    await makeLink({ shortUrl: 'link-1' })
    await makeLink({ shortUrl: 'link-2' })
    await makeLink({ shortUrl: 'link-3' })

    const result = await getLinks({ page: 1, pageSize: 10 })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.value.links).toHaveLength(3)
      expect(result.value.total).toBe(3)
    }
  })

  it('should respect pagination with page and pageSize', async () => {
    await makeLink({ shortUrl: 'link-a' })
    await makeLink({ shortUrl: 'link-b' })
    await makeLink({ shortUrl: 'link-c' })

    const result = await getLinks({ page: 1, pageSize: 2 })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.value.links).toHaveLength(2)
      expect(result.value.total).toBe(3)
    }
  })

  it('should return empty list when page exceeds total records', async () => {
    await makeLink({ shortUrl: 'only-link' })

    const result = await getLinks({ page: 99, pageSize: 10 })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.value.links).toHaveLength(0)
      expect(result.value.total).toBe(1)
    }
  })

  it('should return empty list when no links exist', async () => {
    const result = await getLinks()

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.value.links).toHaveLength(0)
      expect(result.value.total).toBe(0)
    }
  })
})
