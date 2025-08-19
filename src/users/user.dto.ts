import { Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, IsOptional, MinLength, ValidateNested } from 'class-validator';

export class createProfileDto{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

export class createUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ValidateNested()
  @Type (() => createProfileDto)
  @IsNotEmpty()
  profile: createProfileDto;
}

export class updateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsOptional()
  password: string;
}
