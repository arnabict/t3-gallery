import { type Config } from "drizzle-kit";
import { config } from "dotenv";

// Load environment variables for drizzle-kit (runs outside Next.js)
config({ path: ".env" });

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    // Use non-pooled connection for migrations (required for drizzle-kit)
    url: env.DATABASE_URL_UNPOOLED ?? env.DATABASE_URL,
  },
  tablesFilter: ["t3gallery_*"],
} satisfies Config;
