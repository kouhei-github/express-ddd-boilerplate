import { z } from 'zod'

const jwtClaimSchema = z.object({
  email: z.string(),
  userId: z.number(),
})

type JwtClaimSchema = z.infer<typeof jwtClaimSchema>

export { jwtClaimSchema, JwtClaimSchema }
