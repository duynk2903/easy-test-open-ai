import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { FirebaseConfigModel } from './shared/model/firebase.config.model';
import { buildFireBaseConfigFromConfigService } from './shared/config/firebase.config';
import { initializeApp } from 'firebase/app';
import FirebaseHelperInstance from './shared/helpers/firebase.helper';
import { Configuration, OpenAIApi } from 'openai';
import OpenAIInstance from './shared/helpers/openai.helper';
/**
 * Main application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService: ConfigService = app.get(ConfigService);
  const configuration = new Configuration({
    apiKey: configService.get<string>('OPENAI_API_KEY'),
  });
  const openai = new OpenAIApi(configuration);
  OpenAIInstance.setGlobalApi(openai);

  const firebaseConfig: FirebaseConfigModel =
    buildFireBaseConfigFromConfigService(configService);

  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseHelper = FirebaseHelperInstance;
  firebaseHelper.setFirebaseApplication(firebaseApp);
  firebaseHelper.setConfiguration(firebaseConfig);

  const config = new DocumentBuilder()
    .setTitle('Easy test open API')
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
        in: 'header',
      },
      'accessToken',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
