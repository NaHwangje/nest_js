import { Body, Controller, Headers, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MaxLengthPipe, MinLenghtPipe, PasswordPipe } from './pipe/password.pipe';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { AccessTokenGuard, RefreshTokenGuard } from './guard/bearer-token.guard';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  @UseGuards(RefreshTokenGuard)
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
  @UseGuards(RefreshTokenGuard)
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
  @UseGuards(BasicTokenGuard)
  postLoginEmail(
    @Headers('authorization') rawToken: string, 
    @Request() req
    ) {
      // email: password -> Base64
      // asdflkjasjhdfjklhas -> email:password
      const token = this.authService.extractTokenFromHeader(rawToken, false);

      const credentials = this.authService.decodeBasicToken(token);
      
    return this.authService.loginWithEmail(credentials);
  }

  @Post('register/email')
  postRegisterEmail(
    @Body()body:RegisterUserDto
    // @Body('nickname') nickname: string,
    // @Body('email') email: string,
    // @Body('password', new MaxLengthPipe(8), new MinLenghtPipe(3)) password: string,
  ) {
    return this.authService.registerWithEmail(body);
  }
}
