import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { db } from './index'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function runMigrations() {
  console.log('Running migrations...')
  
  const migrationsPath = process.env.NODE_ENV === 'production' 
    ? path.join(__dirname, 'migrations') 
    : path.resolve('src/infra/db/migrations')

  try {
    await migrate(db, { migrationsFolder: migrationsPath })
    console.log('Migrations completed successfully!')
  } catch (error) {
    console.error('Migrations failed:', error)
    throw error
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runMigrations()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}
