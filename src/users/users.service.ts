import {
  Injectable,
  Inject,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './users.entity';
import { UserSignUpDTO } from './dto/user.signup.dto';
import { UserSignInDTO } from './dto/user.signin.dto';
import { JwtService } from '@nestjs/jwt';
import { UserPayloadInterface } from './users.payload-interface';

const bcrypt = require('bcrypt');
@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async create(userSignUpDto: UserSignUpDTO): Promise<object> {
    console.log({ userSignUpDto });

    let { firstName, lastName, username, password } = userSignUpDto;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    let result: any = {};
    try {
      console.log('hereeeeeeeeee');

      result = await this.usersRepository.create({
        firstName,
        lastName,
        username,
        password,
      });
    } catch (error) {
      console.log(error.original.code);

      // console.log(error.original);
      if (error.original.code == 23505)
        //23505: duplicate data in unique field
        throw new ConflictException('نام کاربری تکراری است.');
      else throw new InternalServerErrorException('خطای سرور');
    }

    return { id: result.dataValues.id };
  }

  async signin(
    userSignInDTO: UserSignInDTO,
  ): Promise<{ jwtToken: string; user: object }> {
    const { username, password } = userSignInDTO;

    const user = await this.usersRepository.findOne({
      where: { username },
      raw: true,
    });

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new NotFoundException('نام کاربری یا کذرواژه اشتباه است.');

    const payload: UserPayloadInterface = { username, userId: user.id };
    const jwtToken = this.jwtService.sign(payload);

    delete user.password;
    return {
      jwtToken,
      user,
    };
  }
}
