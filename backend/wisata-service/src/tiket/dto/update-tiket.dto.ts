import { PartialType } from '@nestjs/mapped-types';
import { CreateTiketDto } from './create-tiket.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTiketDto extends PartialType(CreateTiketDto) {
  namaPemesan?: string;
  email?: string;
  jenisTiket?: string;
  harga?: number;
  jumlahTiket?: number;
  totalHarga?: number;
  wisataId?: number;

  @IsOptional()
  @IsString()
  status?: string;
}