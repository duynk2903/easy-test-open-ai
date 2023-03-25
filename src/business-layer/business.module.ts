import { AppService } from './services/app.service';
import { UserService } from './services/user.service';
import { LocalStrategy } from './security/local.stratery';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './security/jwt.strategy';
import { ChatService } from './services/chat.service';

const businessModule = () => {
  return [
    AppService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    AuthService,
    ChatService,
  ];
};

export { businessModule };
