import { resolve } from 'path'
import { Request, Response } from 'express'
import { getCustomRepository } from "typeorm"
import { SurveyRepository } from '../repositories/SurveyRepository'
import { SurveyUserRepository } from "../repositories/SurveyUserRepository"
import { UserRepository } from '../repositories/UserRepository'
import SendMailService from '../services/SendMailService'

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body
    const userRepository = getCustomRepository(UserRepository)
    const surveyRepository = getCustomRepository(SurveyRepository)
    const surveyUserRepository = getCustomRepository(SurveyUserRepository)

    const user = await userRepository.findOne({ email })
    if (!user) {
      return response.status(400).json({
        error: "User with this email does not exists!"
      })
    }

    const survey = await surveyRepository.findOne({ id: survey_id })
    if (!survey) {
      return response.status(400).json({
        error: "This survey does not exists!"
      })
    }

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")

    const variables = {
      name: user.name, title: survey.title,
      description: survey.description, user_id: user.id,
      link: process.env.URL_MAIL
    }

    const surveyUserAlreadyExists = await surveyUserRepository.findOne({
      where: [{ user_id: user.id }, { value: null }]
    })

    if (surveyUserAlreadyExists) {
      await SendMailService.execute(email, survey.title, variables, npsPath)
      return response.json(surveyUserAlreadyExists)
    }

    const surveyUser = await surveyUserRepository.create({
      user_id: user.id,
      survey_id: survey.id
    })
    await surveyUserRepository.save(surveyUser)

    await SendMailService.execute(user.email, survey.title, variables, npsPath)

    return response.json(surveyUser)
  }
}

export { SendMailController }

