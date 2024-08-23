import { Router } from 'express'
import { IJwtMiddleware } from '../middleware/jwtMiddleware'
import { IAuthController, IHealthCheckController, ITaskController, IWorkSpaceController } from './implument'

const router = Router()

export interface IWebHooks {
  register(): Router
}

export class WebHooks implements IWebHooks {
  constructor(
    private readonly jwtMiddleware: IJwtMiddleware,
    private readonly health: IHealthCheckController,
    private readonly auth: IAuthController,
    private readonly task: ITaskController,
    private readonly workspace: IWorkSpaceController,
  ) {}

  register(): Router {
    // 認証の必要無いルーティング
    const publicRouter = Router()
    this.setupPublicRoutes(publicRouter)
    router.use('/v1', publicRouter)

    // 認証関連のルーティング
    const authRouter = Router()
    this.setupAuthRoutes(authRouter)
    router.use('/v1/auth', authRouter)

    // 一般ユーザー向けのルーティング
    const userRouter = Router()
    userRouter.use((req, res, next) => this.jwtMiddleware.jwtCheck(req, res, next)) // 共通ミドルウェアを適用
    this.setupNormalUserRoutes(userRouter)
    router.use('/v1', userRouter)

    // 管理者用のルーティング
    const adminRouter = Router()
    adminRouter.use((req, res, next) => this.jwtMiddleware.jwtCheck(req, res, next)) // 共通ミドルウェアを適用
    this.setupAdminRoutes(adminRouter)
    router.use('/v1/admin', adminRouter)

    return router
  }

  private setupPublicRoutes(publicRouter: Router): void {
    publicRouter.get('/health', (req, res) => this.health.healthCheck(req, res))
  }

  private setupAuthRoutes(publicRouter: Router): void {
    publicRouter.post('/login', (req, res) => this.auth.login(req, res))
    publicRouter.post('/signup', (req, res) => this.auth.signup(req, res))
    publicRouter.post('/refresh', (req, res) => this.auth.refresh(req, res))
  }

  private setupNormalUserRoutes(userRouter: Router): void {
    userRouter.get('/tasks', (req, res) => this.task.list(req, res))
    userRouter.post('/tasks', (req, res) => this.task.create(req, res))
    userRouter.get('/tasks/:id', (req, res) => this.task.getTask(req, res))
    userRouter.patch('/tasks/:id', (req, res) => this.task.update(req, res))
  }

  private setupAdminRoutes(adminRouter: Router): void {
    adminRouter.post('/workspace', (req, res) => this.workspace.create(req, res))
  }

  static builder(
    jwtMiddleware: IJwtMiddleware,
    health: IHealthCheckController,
    auth: IAuthController,
    task: ITaskController,
    workspace: IWorkSpaceController,
  ): IWebHooks {
    return new this(jwtMiddleware, health, auth, task, workspace)
  }
}
