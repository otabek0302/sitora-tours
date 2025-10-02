import { z } from 'zod'

/**
 * Environment Variables Schema
 * Validates all required environment variables at startup
 */
const envSchema = z.object({
  // Database
  DATABASE_URI: z.string().min(1, 'DATABASE_URI is required'),
  PAYLOAD_SECRET: z.string().min(1, 'PAYLOAD_SECRET is required'),

  // Server URLs
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().or(z.literal('')),
  NEXT_PUBLIC_API_URL: z.string().url().optional().or(z.literal('')),
  NEXT_PUBLIC_SERVER_URL: z.string().url().optional().or(z.literal('')),

  // Telegram (Optional - but validate if provided)
  NEXT_PUBLIC_TELEGRAM_BOT_TOKEN: z.string().optional(),
  NEXT_PUBLIC_TELEGRAM_CHAT_ID: z.string().optional(),

  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export type Env = z.infer<typeof envSchema>

/**
 * Validates environment variables
 * Throws an error if validation fails
 */
export function validateEnv(): Env {
  try {
    const env = envSchema.parse(process.env)

    // Optional: Warn about missing optional variables
    if (!env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN) {
      console.warn('⚠️  NEXT_PUBLIC_TELEGRAM_BOT_TOKEN not set - Telegram notifications will be disabled')
    }

    if (!env.NEXT_PUBLIC_TELEGRAM_CHAT_ID) {
      console.warn('⚠️  NEXT_PUBLIC_TELEGRAM_CHAT_ID not set - Telegram notifications will be disabled')
    }

    console.log('✅ Environment variables validated successfully')
    return env
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed:')
      error.issues.forEach(issue => {
        console.error(`  - ${issue.path.join('.')}: ${issue.message}`)
      })
      throw new Error('Invalid environment variables. Please check your .env file.')
    }
    throw error
  }
}

/**
 * Get validated environment variables
 * Call this instead of accessing process.env directly
 */
export const env = validateEnv()
