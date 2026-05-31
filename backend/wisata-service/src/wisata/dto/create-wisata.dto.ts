import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateWisataDto {
  @ApiProperty({
    example: 'Zona Gajah',
  })
  @IsString()
  nama!: string;

  @ApiProperty({
    example: 'Area melihat gajah',
  })
  @IsString()
  deskripsi!: string;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  kategoriId!: number;
}