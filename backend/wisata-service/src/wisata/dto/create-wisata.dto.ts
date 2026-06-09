import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
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

  @ApiProperty({
    example: 'gambar.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  gambar?: string;
}