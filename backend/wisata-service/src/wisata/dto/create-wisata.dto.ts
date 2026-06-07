import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateWisataDto {
  @ApiProperty({
    example: 'Area Singa',
  })
  @IsString()
  @IsNotEmpty()
  nama!: string;

  @ApiProperty({
    example: 'Melihat koleksi singa',
  })
  @IsString()
  @IsNotEmpty()
  deskripsi!: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  kategoriId!: number;
}