import { PartialType } from '@nestjs/mapped-types'
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProfileDto{
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    role: string;
  }
  
  export class UpdateProfileDto extends PartialType(CreateProfileDto){}