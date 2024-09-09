// Zodのスキーマ定義
import { z } from 'zod'

const authSchema = z.object({
  email: z.string(),
  password: z.string(),
})

type AuthRequestBody = z.infer<typeof authSchema>

const passwordResetSchema = authSchema.pick({ email: true })

type PasswordResetBody = z.infer<typeof passwordResetSchema>

const passwordUpdateSchema = z.object({
  token: z.string(),
  password: z.string(),
})
type PasswordUpdateBody = z.infer<typeof passwordUpdateSchema>

export { AuthRequestBody, authSchema, PasswordResetBody, passwordResetSchema, PasswordUpdateBody, passwordUpdateSchema }
