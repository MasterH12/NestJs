import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsArray()
  @IsNumber({}, { each:true })
  @IsOptional()
  categoryIds?: number[];
}
