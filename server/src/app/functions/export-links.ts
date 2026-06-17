import { PassThrough } from 'node:stream'
import { stringify } from 'csv-stringify'
import { db } from '@/infra/db'
import * as schema from '@/infra/db/schemas'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'
import { type Either, right } from '@/infra/shared/either'

interface ExportLinksOutput {
  url: string
}

export async function exportLinks(): Promise<Either<never, ExportLinksOutput>> {
  const links = await db.select().from(schema.links).orderBy(schema.links.createdAt)

  const csvStream = stringify({
    header: true,
    columns: [
      { key: 'originalUrl', header: 'Original URL' },
      { key: 'shortUrl', header: 'Short URL' },
      { key: 'accessCount', header: 'Access Count' },
      { key: 'createdAt', header: 'Created At' },
    ],
  })

  const passThrough = new PassThrough()
  csvStream.pipe(passThrough)

  for (const link of links) {
    csvStream.write({
      originalUrl: link.originalUrl,
      shortUrl: link.shortUrl,
      accessCount: link.accessCount,
      createdAt: link.createdAt.toISOString(),
    })
  }

  csvStream.end()

  const fileName = `links-${crypto.randomUUID()}.csv`

  const { url } = await uploadFileToStorage({
    fileName,
    contentType: 'text/csv',
    body: passThrough,
  })

  return right({ url })
}
