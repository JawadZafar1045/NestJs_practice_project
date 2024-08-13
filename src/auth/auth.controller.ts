import { Controller, Post, Body, HttpStatus, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res() res: Response) {
    // The interceptor will handle JWT generation and response attachment
    // No need to manually set response in the controller
  }
}
