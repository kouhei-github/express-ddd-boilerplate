import {Request, Response} from 'express'
import {IHelloWorldService} from '../service/helloWorldService'

export interface IHelloWorldController {
  getHelloWorld(req: Request, res: Response): Promise<void>
}

export class HelloWorldController implements IHelloWorldController
{
  constructor(private helloWorldService: IHelloWorldService) {
  }
  async getHelloWorld(req: Request, res: Response)
  {
    const { name} = req.query
    res.send(`Hello, ${name}!`);
  }

  static builder(service: IHelloWorldService): IHelloWorldController
  {
    return new this(service)
  }
}