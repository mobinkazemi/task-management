import {
  IsAlpha,
  IsAlphanumeric,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserSignUpDTO {
  @IsAlpha()
  @IsNotEmpty()
  firstName: string;

  @IsAlpha()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(32)
  username: string;

  @IsNotEmpty()
  @MaxLength(64)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  password: string;
}
