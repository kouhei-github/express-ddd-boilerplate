// Zodのスキーマ定義
import { z } from 'zod'

const authSchema = z.object({
  email: z.string(),
  password: z.string(),
})

type AuthRequestBody = z.infer<typeof authSchema>

export { AuthRequestBody, authSchema }
