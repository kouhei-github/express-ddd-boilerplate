import { z } from 'zod'
import { memberSchema } from './member'

const workspaceSchema = z.object({
  name: z.string(),
  workspacePicture: z.string().url().optional(), // URLの形式を検証し、nullを許容
  plan: z.string().optional(), // オプショナルな文字列
  planStartDate: z.date().optional(), // ISO8601形式の日付文字列を検証
  planEndDate: z.date().optional(), // ISO8601形式の日付文字列を検証
  maxMembers: z.number().optional(), // オプショナルな数値
  type: z.string().optional(), // オプショナルな文字列
  createdAt: z.date(),
  updatedAt: z.date(),
  members: z.array(memberSchema).optional(),
})

type WorkspaceDto = z.infer<typeof workspaceSchema>

export { WorkspaceDto, workspaceSchema }
