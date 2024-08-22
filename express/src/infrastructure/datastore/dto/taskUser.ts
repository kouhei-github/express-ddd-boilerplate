import { z } from 'zod'

// Task スキーマ
const taskUserSchema = z.object({
  taskId: z.number(), // 自動生成されるため、オプション扱い
  userId: z.number(),
})

// Task 型を推論
type TaskUserSchemaDto = z.infer<typeof taskUserSchema>

export { taskUserSchema, TaskUserSchemaDto }
