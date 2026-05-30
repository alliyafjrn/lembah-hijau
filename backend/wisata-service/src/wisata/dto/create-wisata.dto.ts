import { IsString } from 'class-validator';

export class CreateWisataDto {
  @IsString()
  nama: string;

  @IsString()
  deskripsi: string;

  @IsString()
  lokasi: string;
}