import { IsOptional, IsString } from 'class-validator';

export class UpdateWisataDto {
  @IsOptional()
  @IsString()
  nama?: string;

  @IsOptional()
  @IsString()
  deskripsi?: string;

  @IsOptional()
  @IsString()
  lokasi?: string;
}