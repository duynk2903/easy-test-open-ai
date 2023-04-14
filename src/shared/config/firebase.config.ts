import { FirebaseConfigModel } from '../model/firebase.config.model'
import envConfig from './env.config'

/**
 * Build firebase config from config service
 * @refer: .env file
 */
function buildFireBaseConfigFromConfigService() {
  const {
    OPEN_AI_FIREBASE_API_KEY,
    OPEN_AI_FIREBASE_AUTH_DOMAIN,
    OPEN_AI_FIREBASE_PROJECT_ID,
    OPEN_AI_FIREBASE_STORAGE_BUCKET,
    OPEN_AI_FIREBASE_MESSAGING_SENDER_ID,
    OPEN_AI_FIREBASE_APP_ID,
    OPEN_AI_FIREBASE_MEASUREMENT_ID
  } = envConfig()
  const firebaseConfigService: FirebaseConfigModel = {
    apiKey: OPEN_AI_FIREBASE_API_KEY,
    authDomain: OPEN_AI_FIREBASE_AUTH_DOMAIN,
    projectId: OPEN_AI_FIREBASE_PROJECT_ID,
    storageBucket: OPEN_AI_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: OPEN_AI_FIREBASE_MESSAGING_SENDER_ID,
    appId: OPEN_AI_FIREBASE_APP_ID,
    measurementId: OPEN_AI_FIREBASE_MEASUREMENT_ID
  }

  return firebaseConfigService
}

export { buildFireBaseConfigFromConfigService }
