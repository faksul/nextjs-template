import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    // Use plural table names like users, sessions instead of user, session
    // usePlural: true 
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    // Add social providers here as needed
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // },
  },
  // Better auth uses default id for primary key
  // We disable the default id here and use uuid instead
  advanced: {
    database: {
      generateId: false
    }
  }
});
