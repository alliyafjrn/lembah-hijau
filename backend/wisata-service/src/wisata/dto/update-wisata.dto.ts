import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWisataDto {
  @ApiPropertyOptional({
    example: 'Lembah Hijau Lampung',
  })
  nama?: string;

  @ApiPropertyOptional({
    example: 'Wisata Kebun Binatang dan Waterboom',
  })
  deskripsi?: string;

  @ApiPropertyOptional({
    example: 'Bandar Lampung',
  })
  lokasi?: string;
}