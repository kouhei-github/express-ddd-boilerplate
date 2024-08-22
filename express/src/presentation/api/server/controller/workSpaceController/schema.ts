import { z } from 'zod'

const workspaceRequestSchema = z.object({
  name: z.string(),
  workspacePicture: z.string().url(), // URLの形式を検証し、nullを許容
  plan: z.string(), // オプショナルな文字列
  planStartDate: z.string().datetime(), // ISO8601形式の日付文字列を検証
  planEndDate: z.string().datetime(), // ISO8601形式の日付文字列を検証
  maxMembers: z.number(), // オプショナルな数値
  type: z.string(), // オプショナルな文字列
})

type WorkspaceRequestBody = z.infer<typeof workspaceRequestSchema>

export { WorkspaceRequestBody, workspaceRequestSchema }
