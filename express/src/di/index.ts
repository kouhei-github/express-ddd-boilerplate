import {UserRepository} from '../repositories/UserRepository'
import {HelloWorldService} from '../service/helloWorldService'
import {HelloWorldController} from '../controllers/helloWorldController'
import {IWebHooks, WebHooks} from '../router'
import {UserService} from '../service/userService'
import {SecurityService} from '../service/SecurityService'
import {UserController} from '../controllers/userController'

export const injection = (): IWebHooks => {
  const userRepository = UserRepository.builder()
  const helloWorldService = HelloWorldService.builder(userRepository)
  const helloWorldHandler = HelloWorldController.builder(helloWorldService)

  const userService = UserService.builder(userRepository)
  const securityService = SecurityService.builder()
  const userHandler = UserController.builder(userService, securityService)
  // ここでルーティングの設定
  return WebHooks.builder( helloWorldHandler, userHandler )
}