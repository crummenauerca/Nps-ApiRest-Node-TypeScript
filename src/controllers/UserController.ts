import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body
    const userRepository = getCustomRepository(UserRepository)
    const userAlreadyExists = await userRepository.findOne({ email })

    if (userAlreadyExists) {
      return response.status(400).json({
        error: "An user with this email address already exists!"
      })
    }

    const user = userRepository.create({ name, email })
    await userRepository.save(user)
    return response.status(201).send(user)
  }

  async show(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository)
    const all = await userRepository.find()
    return response.json(all)
  }
}

export { UserController }
