import {
  IsNotEmpty,
  IsAlphanumeric,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserSignInDTO {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(32)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  password: string;
}
