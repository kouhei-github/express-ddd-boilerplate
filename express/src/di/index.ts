import {UserRepository} from "../infrastructure/datastore/repositoryImpl/UserRepository";
import {SignUpUseCase} from "../application/useCase/authUseCase/signUpUseCase";
import {SecurityExternal} from "../infrastructure/external/jwtTokenExternal/jwtToken";
import {AllUserUseCase} from "../application/useCase/userUseCase/allUser";
import {UserController} from "../presentation/api/server/controller/userController";
import {IWebHooks, WebHooks} from "../presentation/api/server/router";
import {ServerMiddleware} from "../presentation/api/server/middleware";

export const injection = (): IWebHooks => {


  const userRepository = UserRepository.builder()

  const middleware = ServerMiddleware.builder(userRepository)

  const securityExternal = SecurityExternal.builder()

  const signUpUseCase = SignUpUseCase.builder(userRepository, securityExternal)

  const allUserUseCase = AllUserUseCase.builder(userRepository)
  const userHandler = UserController.builder(signUpUseCase, allUserUseCase)
  // ここでルーティングの設定
  return WebHooks.builder( userHandler )
}