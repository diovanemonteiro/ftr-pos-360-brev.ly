import { eq } from 'drizzle-orm'
import { db } from '@/infra/db'
import * as schema from '@/infra/db/schemas'
import { type Either, left, right } from '@/infra/shared/either'
import { InvalidShortUrl } from './errors/invalid-short-url'
import { ShortUrlAlreadyExists } from './errors/short-url-already-exists'
import {z} from "zod";

const createLinkInput = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string().min(3),
})

type CreateLinkInput = z.input<typeof createLinkInput>

interface CreateLinkOutput {
  id: string
  originalUrl: string
  shortUrl: string
  accessCount: number
  createdAt: Date
}

const SHORT_URL_REGEX = /^[a-zA-Z0-9-]+$/

export async function createLink(
  input: CreateLinkInput
): Promise<Either<InvalidShortUrl | ShortUrlAlreadyExists, CreateLinkOutput>> {

  const { originalUrl, shortUrl } = createLinkInput.parse(input)

  if (!SHORT_URL_REGEX.test(shortUrl)) {
    return left(new InvalidShortUrl())
  }

  const existing = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))
    .limit(1)

  if (existing.length > 0) {
    return left(new ShortUrlAlreadyExists())
  }

  const [link] = await db
    .insert(schema.links)
    .values({ originalUrl, shortUrl })
    .returning()

  return right(link)
}
