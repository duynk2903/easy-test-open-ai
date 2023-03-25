import { ConfigService } from '@nestjs/config';
import { FirebaseConfigModel } from '../model/firebase.config.model';

/**
 * Build firebase config from config service
 * @refer: .env file
 * @param configService
 */
function buildFireBaseConfigFromConfigService(configService: ConfigService) {
  const firebaseConfigService: FirebaseConfigModel = {
    apiKey: configService.get<string>('OPEN_AI_FIREBASE_API_KEY'),
    authDomain: configService.get<string>('OPEN_AI_FIREBASE_AUTH_DOMAIN'),
    projectId: configService.get<string>('OPEN_AI_FIREBASE_PROJECT_ID'),
    storageBucket: configService.get<string>('OPEN_AI_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: configService.get<string>(
      'OPEN_AI_FIREBASE_MESSAGING_SENDER_ID',
    ),
    appId: configService.get<string>('OPEN_AI_FIREBASE_APP_ID'),
    measurementId: configService.get<string>('OPEN_AI_FIREBASE_MEASUREMENT_ID'),
  };

  return firebaseConfigService;
}

export { buildFireBaseConfigFromConfigService };
