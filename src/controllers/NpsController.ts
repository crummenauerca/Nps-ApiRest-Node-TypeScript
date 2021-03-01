import { Response, Request } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class NpsController {
  // (Número de promotores - número de detratores) / (número de respondentes) * 100
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params
    const surveyUserRepository = getCustomRepository(SurveyUserRepository)

    const surveysUsers = await surveyUserRepository.find({ survey_id, value: Not(IsNull()) })
    const detrators = surveysUsers.filter(surveyUser =>
      (surveyUser.value >= 0 && surveyUser.value <= 6)
    ).length

    const promoters = surveysUsers.filter(surveyUser =>
      (surveyUser.value >= 9 && surveyUser.value <= 10)
    ).length

    const passives = surveysUsers.filter(surveyUser =>
      (surveyUser.value >= 7 && surveyUser.value <= 8)
    ).length

    const totalAnswers = surveysUsers.length

    const calculate = ((promoters - detrators) / totalAnswers) * 100

    return response.json({
      detrators,
      promoters,
      passives,
      totalAnswers,
      npm: `${calculate.toFixed(2)}%`
    })
  }
}

export { NpsController }