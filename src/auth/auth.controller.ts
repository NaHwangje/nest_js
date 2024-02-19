import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MaxLengthPipe, MinLenghtPipe, PasswordPipe } from './pipe/password.pioe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  postTokenAccess(
    @Headers('authorization') rawToken: string
  ){
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    const newToken = this.authService.rotateToken(token, false);

    /**
     * {accessToken: {token}}
     */
    return{
      accessToken: newToken,
    }
  }

  @Post('token/refresh')
  postTokenRefresh(
    @Headers('authorization') rawToken: string
  ){
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    const newToken = this.authService.rotateToken(token, true);

    /**
     * {refreshToken: {token}}
     */
    return{
      refreshToken: newToken,
    }
  }

  @Post('login/email')
  postLoginEmail(
    @Headers('authorization') rawToken: string, 
    ) {
      // email: password -> Base64
      // asdflkjasjhdfjklhas -> email:password
      const token = this.authService.extractTokenFromHeader(rawToken, false);

      const credentials = this.authService.decodeBasicToken(token);
      
    return this.authService.loginWithEmail(credentials);
  }

  @Post('register/email')
  postRegisterEmail(
    @Body('nickname') nickname: string,
    @Body('email') email: string,
    @Body('password', new MaxLengthPipe(8), new MinLenghtPipe(3)) password: string,
  ) {
    return this.authService.registerWithEmail({
      email,
      password,
      nickname,
    });
  }
}
