import { UserService } from './services/user.service'
import { LocalStrategy } from './security/local.stratery'
import { AuthService } from './services/auth.service'
import { JwtStrategy } from './security/jwt.strategy'
import { ChatService } from './services/chat.service'
import { TranslateService } from './services/translate.service'

/**
 * Business module with all service declare here
 */
const businessModule = () => {
  return [UserService, LocalStrategy, JwtStrategy, AuthService, ChatService, TranslateService]
}

export { businessModule }
