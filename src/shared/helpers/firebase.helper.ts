import { FirebaseApp } from '@firebase/app'
import { FirebaseConfigModel } from '../model/firebase.config.model'
import { getFirestore } from 'firebase/firestore/lite'
import { Firestore } from '@firebase/firestore/lite'

class FirebaseHelper {
  firebaseApp: FirebaseApp
  firebaseConfig: FirebaseConfigModel
  firestore: Firestore

  setFirebaseApplication(app: FirebaseApp) {
    this.firebaseApp = app
  }

  getFirebaseApp() {
    return this.firebaseApp
  }

  setConfiguration(config: FirebaseConfigModel) {
    this.firebaseConfig = config
  }

  getFirebaseConfiguration(): FirebaseConfigModel {
    return this.firebaseConfig
  }

  getFireStore(): Firestore {
    return getFirestore(this.firebaseApp)
  }
}

const FirebaseHelperInstance = new FirebaseHelper()

export default FirebaseHelperInstance
