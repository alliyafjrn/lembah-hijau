import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateWisataDto {
  @ApiProperty({
    example: 'Lembah Hijau',
  })
  @IsString()
  nama: string;

  @ApiProperty({
    example: 'Wisata Kebun Binatang',
  })
  @IsString()
  deskripsi: string;

  @ApiProperty({
    example: 'Bandar Lampung',
  })
  @IsString()
  lokasi: string;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  kategoriId: number;
}