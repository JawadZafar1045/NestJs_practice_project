import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    if (request.method === 'POST' && request.url === '/auth/login') {
      const { email, password } = request.body;

      if (!email || !password) {
        throw new UnauthorizedException('Email and password are required');
      }

     
      const user = await this.authService.validateUser(email, password);

      if (user) {
        const token = await this.authService.generateJwt(user);
        
        response.json({ access_token: token });
        return of(null); 
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    }

    
    return next.handle();
  }
}
