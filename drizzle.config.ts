import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv'

// drizzle-kit *requires* dotenv in configs
dotenv.config({ path: '.env.local' })

export default defineConfig({
  out: './drizzle',
  schema: './db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
