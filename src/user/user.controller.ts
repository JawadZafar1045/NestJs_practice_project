// user.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Res ,HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response
  ) {
    try {
      const user = await this.userService.create(createUserDto);
      res.status(HttpStatus.CREATED).json({
        message: 'User registered successfully',
        user: {
          email: user.email,
          username: user.username,
         
        },
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Registration failed',
        error: error.message,
      });
    }
  }
}