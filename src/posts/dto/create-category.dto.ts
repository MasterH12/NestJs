import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty} from "@nestjs/swagger"

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  name: string;
}