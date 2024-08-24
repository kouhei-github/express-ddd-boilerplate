import { PrismaClient } from '@prisma/client'
import { LoginUseCase } from '../application/useCase/authUseCase/loginUseCase'
import { RefreshTokenUseCase } from '../application/useCase/authUseCase/refreshTokenUseCase'
import { SignUpUseCase } from '../application/useCase/authUseCase/signUpUseCase'
import { TaskCreateUseCase } from '../application/useCase/taskUseCase/taskCreateUseCase'
import { TaskGetUseCase } from '../application/useCase/taskUseCase/taskGetUseCase'
import { TaskListUseCase } from '../application/useCase/taskUseCase/taskListUseCase'
import { TaskPatchUseCase } from '../application/useCase/taskUseCase/taskPatchUseCase'
import { GetUserUseCase } from '../application/useCase/userUseCase/getUserById'
import { WorkSpaceCreateUseCase } from '../application/useCase/workSpaceUseCase/workSpaceCreateUseCase'
import { TaskRepository } from '../infrastructure/datastore/repositoryImpl/taskRepository'
import { UserRepository } from '../infrastructure/datastore/repositoryImpl/userRepository'
import { WorkSpaceRepository } from '../infrastructure/datastore/repositoryImpl/workSpaceRepository'
import { EnvLibExternal } from '../infrastructure/external/envExternal/envLib'
import { JwtTokenExternal } from '../infrastructure/external/securityExternal/jwtTokenExternal'
import { SecurityExternal } from '../infrastructure/external/securityExternal/security'
import { AuthController } from '../presentation/api/server/controller/authController/authController'
import { HealthCheckController } from '../presentation/api/server/controller/healthCheckController'
import { TaskController } from '../presentation/api/server/controller/taskController/taskController'
import { WorkSpaceController } from '../presentation/api/server/controller/workSpaceController/workSpaceController'
import { JwtMiddleware } from '../presentation/api/server/middleware/jwtMiddleware'
import { IWebHooks, WebHooks } from '../presentation/api/server/router'

export const injection = (db: PrismaClient): IWebHooks => {
  // 環境変数を読み込むための外部ライブラリを初期化
  const env = EnvLibExternal.builder()

  // ユーザーリポジトリの初期化 (PrismaClientを使用してデータベース操作を行う)
  const userRepository = UserRepository.builder(db)

  // パスワードのハッシュ化などのセキュリティ処理を提供する外部サービスを初期化
  const securityExternal = SecurityExternal.builder(env)

  // JWTトークンの生成と検証を行う外部サービスを初期化
  const jwtExternal = JwtTokenExternal.builder(env)

  // ユーザー登録（サインアップ）に関するユースケースを初期化
  const signUpUseCase = SignUpUseCase.builder(userRepository, securityExternal)

  // すべてのユーザーを取得するユースケースを初期化
  const getUserUseCase = GetUserUseCase.builder(userRepository)

  // ユーザーのログインに関するユースケースを初期化（JWTトークンの発行を含む）
  const loginUseCase = LoginUseCase.builder(userRepository, securityExternal, jwtExternal)

  // リフレッシュトークン用のユースケース
  const refreshToken = RefreshTokenUseCase.builder(jwtExternal)

  // ヘルスチェック用のコントローラー
  const healthCheckHandler = HealthCheckController.builder()

  // 認証用のコントローラ
  const authHandler = AuthController.builder(signUpUseCase, loginUseCase, refreshToken, getUserUseCase)

  // JWTトークンをチェックするミドルウェア
  const jwtMiddleware = JwtMiddleware.builder(jwtExternal)

  // タスクを作成する
  const taskRepository = TaskRepository.builder(db)
  const taskCreateUseCase = TaskCreateUseCase.builder(taskRepository)
  const taskGetUseCase = TaskGetUseCase.builder(taskRepository)
  const taskPatchUseCase = TaskPatchUseCase.builder(taskRepository)
  const taskListUseCase = TaskListUseCase.builder(taskRepository)
  const taskHandler = TaskController.builder(taskCreateUseCase, taskGetUseCase, taskPatchUseCase, taskListUseCase)

  // ワークスペース
  const workspaceRepository = WorkSpaceRepository.builder(db)
  const workspaceCreateUseCase = WorkSpaceCreateUseCase.builder(workspaceRepository)
  const workspaceHandler = WorkSpaceController.builder(workspaceCreateUseCase)
  // ここでWebフックのルーティング設定を行い、IWebHooksインターフェースを返す
  return WebHooks.builder(jwtMiddleware, healthCheckHandler, authHandler, taskHandler, workspaceHandler)
}
