import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty} from "@nestjs/swagger"

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  published?: boolean;

  @IsArray()
  @IsNumber({}, { each:true })
  @IsOptional()
  @ApiProperty()
  categoryIds?: number[];
}
