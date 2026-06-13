import { PartialType } from '@nestjs/mapped-types';
import { CreateTiketDto } from './create-tiket.dto';

export class UpdateTiketDto extends PartialType(CreateTiketDto) {
  namaPemesan?: string;
  email?: string;
  jenisTiket?: string;
  harga?: number;
  jumlahTiket?: number;
  totalHarga?: number;
  wisataId?: number;
}