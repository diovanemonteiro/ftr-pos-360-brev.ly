import type { Config } from 'drizzle-kit'
import {env} from "@/env";

export default {
  schema: 'src/infra/db/schemas/*',
  out: 'src/infra/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config