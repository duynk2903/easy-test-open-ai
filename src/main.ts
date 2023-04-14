import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { FirebaseConfigModel } from './shared/model/firebase.config.model'
import { buildFireBaseConfigFromConfigService } from './shared/config/firebase.config'
import { initializeApp } from 'firebase/app'
import FirebaseHelperInstance from './shared/helpers/firebase.helper'
import { Configuration, OpenAIApi } from 'openai'
import OpenAIInstance from './shared/helpers/openai.helper'
import envConfig from './shared/config/env.config'
/**
 * Main application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const { OPENAI_API_KEY, OPEN_AI_APP_NAME, OPEN_AI_PORT } = envConfig()
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY
  })
  const openai = new OpenAIApi(configuration)
  OpenAIInstance.setGlobalApi(openai)

  const firebaseConfig: FirebaseConfigModel = buildFireBaseConfigFromConfigService()

  const firebaseApp = initializeApp(firebaseConfig)
  const firebaseHelper = FirebaseHelperInstance
  firebaseHelper.setFirebaseApplication(firebaseApp)
  firebaseHelper.setConfiguration(firebaseConfig)

  const config = new DocumentBuilder()
    .setTitle(OPEN_AI_APP_NAME)
    .setDescription('The easy test chat open API')
    .setVersion('0.0.1')
    .addTag('ChatAPI')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header'
      },
      'accessToken'
    )
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(OPEN_AI_PORT)
}
bootstrap()
