import { Router } from 'express'
import {IHelloWorldController} from '../controllers/helloWorldController'
import {IUserController} from '../controllers/userController'

const router = Router()

export interface IWebHooks {
  register(): Router
}

export class WebHooks implements IWebHooks {
  constructor(
      private helloWorldHandler: IHelloWorldController,
      private userController: IUserController
  ) {
  }

  register(): Router
  {
    router.get("/v1/hello", (req, res) => this.helloWorldHandler.getHelloWorld(req, res))
    router.get("/v1/users", (req, res) => this.userController.getUsers(req, res))
    router.post("/v1/users", (req, res) => this.userController.saveUser(req, res))
    return router
  }


  static builder(
      helloWorldHandler: IHelloWorldController,
      userController: IUserController
  ): IWebHooks
  {
    return new this(helloWorldHandler, userController);
  }
}