import { z } from 'zod'
import { taskUserSchema } from './taskUser'

const userSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  email: z.string().email(),
  loginType: z.string().nullable(),
  profilePicture: z.string().nullable(),
  language: z.string().nullable(),
  timezone: z.string().nullable(),
  status: z.string().nullable(),
})

// Task スキーマ
const taskSchema = z.object({
  id: z.number().optional(), // 自動生成されるため、オプション扱い
  title: z.string(),
  text: z.string(),
  status: z.number(),
  creatorUserId: z.number(),
  isBookMark: z.number(),
  isDeleted: z.boolean(),
  taskDeadline: z.bigint(),
  url: z.string().url().nullable().optional(), // URLが任意であり、nullも許容
  deadline: z.date(),
  createdAt: z.date().optional(), // デフォルトで現在の日時が設定されるため、オプション扱い
  updatedAt: z.date().optional(), // デフォルトで現在の日時が設定されるため、オプション扱い
  creatorUser: userSchema.optional(),
  users: z.array(taskUserSchema).optional(),
})

const taskListSchema = z.array(taskSchema)

// Task 型を推論
type TaskDto = z.infer<typeof taskSchema>

export { TaskDto, taskListSchema, taskSchema }
