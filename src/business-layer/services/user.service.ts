import { Injectable } from '@nestjs/common'
import { collection, getDocs } from 'firebase/firestore/lite'
import FirebaseHelperInstance from '../../shared/helpers/firebase.helper'
import { UserInDto } from '../in-dtos/user.indto'

/**
 * User service
 */
@Injectable()
export class UserService {
  async getAllUser() {
    const database = FirebaseHelperInstance.getFireStore()
    const usersCollection = collection(database, 'users')
    const userSnapshot = await getDocs(usersCollection)
    return userSnapshot.docs.map((doc) => doc.data())
  }

  async getUser(userInDto: UserInDto) {
    const database = FirebaseHelperInstance.getFireStore()
    const usersCollection = collection(database, 'users')
    const { username, password } = userInDto
    const userSnapshot = await getDocs(usersCollection)
    return userSnapshot.docs
      .map((doc) => doc.data())
      .find((el: any) => el.username === username && password === el.password)
  }
}
