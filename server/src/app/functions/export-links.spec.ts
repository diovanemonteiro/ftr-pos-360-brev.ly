import { describe, it, expect, beforeEach, vi } from 'vitest'
import { db } from '@/infra/db'
import * as schema from '@/infra/db/schemas'
import { exportLinks } from './export-links'
import { makeLink } from '@/infra/test/factories/make-link'
import * as uploadModule from '@/infra/storage/upload-file-to-storage'

describe('exportLinks', () => {
  beforeEach(async () => {
    await db.delete(schema.links)
    vi.restoreAllMocks()
  })

  it('should export links to CSV and return a URL', async () => {
    await makeLink({ shortUrl: 'link-1' })
    await makeLink({ shortUrl: 'link-2' })

    vi.spyOn(uploadModule, 'uploadFileToStorage').mockResolvedValue({
      url: 'https://cdn.example.com/links-test.csv',
    })

    const result = await exportLinks()

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.value.url).toBe('https://cdn.example.com/links-test.csv')
    }

    expect(uploadModule.uploadFileToStorage).toHaveBeenCalledOnce()
    const call = vi.mocked(uploadModule.uploadFileToStorage).mock.calls[0][0]
    expect(call.contentType).toBe('text/csv')
    expect(call.fileName).toMatch(/^links-.*\.csv$/)
  })

  it('should export CSV with zero links (header only)', async () => {
    vi.spyOn(uploadModule, 'uploadFileToStorage').mockResolvedValue({
      url: 'https://cdn.example.com/links-empty.csv',
    })

    const result = await exportLinks()

    expect(result.success).toBe(true)
    expect(uploadModule.uploadFileToStorage).toHaveBeenCalledOnce()
  })
})
