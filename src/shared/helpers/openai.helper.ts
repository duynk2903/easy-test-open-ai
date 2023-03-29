import { OpenAIApi } from 'openai/api'

export class OpenAIHelperInstance {
  openAI: OpenAIApi | any

  setGlobalApi(api: OpenAIApi | any) {
    this.openAI = api
  }

  getOpenAI(): OpenAIApi {
    return this.openAI
  }
}

const OpenAIInstance = new OpenAIHelperInstance()

export default OpenAIInstance
