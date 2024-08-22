// Zodのスキーマ定義
import { z } from 'zod'

const taskRequestSchema = z.object({
  deadline: z.string(),
  isBookMark: z.number(),
  isDeleted: z.boolean(),
  status: z.number(),
  taskDeadline: z.number(),
  text: z.string(),
  title: z.string(),
  url: z.string().url(), // URLの形式を検証
})

type TaskRequestBody = z.infer<typeof taskRequestSchema>

export { TaskRequestBody, taskRequestSchema }
