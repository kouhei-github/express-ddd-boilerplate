// Zodのスキーマ定義
import { z } from 'zod'

const taskRequestSchema = z.object({
  deadline: z.string(),
  isBookMark: z.number(),
  isDeleted: z.boolean(),
  status: z.number(),
  taskDeadline: z.number(),
  text: z.string().optional(),
  title: z.string(),
  url: z.string().url().optional(), // URLの形式を検証
  isMyTask: z.boolean(),
  isTimeIncluded: z.boolean(),
})

type TaskRequestBody = z.infer<typeof taskRequestSchema>

export { TaskRequestBody, taskRequestSchema }
