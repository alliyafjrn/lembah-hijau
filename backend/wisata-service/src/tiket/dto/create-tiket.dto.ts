import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';
import { Min } from 'class-validator'; 
import { Type } from 'class-transformer';

export class CreateTiketDto {
  @IsNotEmpty()
  @IsString()
  namaPemesan!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  jenisTiket!: string; 

  
  @IsNumber()
  @IsNotEmpty()
  harga!: number; 
  
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number) 
  jumlahTiket!: number;

  @IsNumber()
  @IsNotEmpty()
  totalHarga!: number; 

  @IsNumber()
  @IsNotEmpty()
  wisataId!: number;

}