import { Router } from 'express'
import {IUserController} from "./implument";

const router = Router()

export interface IWebHooks {
  register(): Router
}

export class WebHooks implements IWebHooks {
  constructor(
      private userController: IUserController
  ) {
  }

  register(): Router
  {
    router.get("/v1/users", (req, res) => this.userController.getUsers(req, res))
    router.post("/v1/users", (req, res) => this.userController.saveUser(req, res))
    return router
  }


  static builder(
      userController: IUserController
  ): IWebHooks
  {
    return new this(userController);
  }
}