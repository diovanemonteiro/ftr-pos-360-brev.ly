import { Upload } from '@aws-sdk/lib-storage'
import { env } from '@/env'
import { r2 } from './client'

interface UploadFileToStorageParams {
  fileName: string
  contentType: string
  body: Buffer | NodeJS.ReadableStream
}

export async function uploadFileToStorage({
  fileName,
  contentType,
  body,
}: UploadFileToStorageParams): Promise<{ url: string }> {
  const upload = new Upload({
    client: r2,
    params: {
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: fileName,
      ContentType: contentType,
      Body: body,
    },
  })

  await upload.done()

  const url = `${env.CLOUDFLARE_PUBLIC_URL}/${fileName}`

  return { url }
}
