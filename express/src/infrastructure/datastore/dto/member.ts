import { z } from 'zod'

const memberSchema = z.object({
  id: z.number(),
  workspaceId: z.number(),
  userId: z.number(),
  role: z.string().nullable(), // null許容の文字列
  status: z.string().nullable(), // null許容の文字列
  createdAt: z.date(), // Date型
  updatedAt: z.date(), // Date型
})

type MemberDto = z.infer<typeof memberSchema>

export { MemberDto, memberSchema }
