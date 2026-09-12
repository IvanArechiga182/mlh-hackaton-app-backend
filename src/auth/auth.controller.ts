import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { ApiOkResponse } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // @ApiOkResponse({
  //   description: 'Login exitoso',
  //   type: LoginResponseDto,
  // })
  // async login(@Body() request: LoginDto): Promise<LoginResponseDto> {
  //   const token = await this.authService.login(request);

  //   return {
  //     authToken: token,
  //   };
  // }
}
