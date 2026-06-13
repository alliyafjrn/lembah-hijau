import {
  IsEmail,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateTiketDto {
  @IsString()
  namaPemesan: string;

  @IsEmail()
  email: string;

  @IsString()
  jenisTiket: string;

  @IsNumber()
  harga: number;

  @IsNumber()
  jumlahTiket: number;

  @IsNumber()
  totalHarga: number;

  @IsNumber()
  wisataId: number;
}