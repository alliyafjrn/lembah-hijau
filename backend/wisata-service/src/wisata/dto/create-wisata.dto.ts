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
    example: 'Lembah Hijau, Bandar Lampung',
  })
  @IsString()
  @IsNotEmpty()
  lokasi!: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  kategoriId!: number;
}