import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignUpDTO } from './dto/user.signup.dto';
import { UserSignInDTO } from './dto/user.signin.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  signup(@Body() userSignUpDto: UserSignUpDTO): Promise<object> {
    return this.usersService.create(userSignUpDto);
  }

  @Get('/signin')
  signin(
    @Query() userSignInDto: UserSignInDTO,
  ): Promise<{ jwtToken: string; user: object }> {
    console.log(userSignInDto);
    return this.usersService.signin(userSignInDto);
  }
}
