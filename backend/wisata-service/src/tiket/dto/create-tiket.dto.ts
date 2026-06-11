import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';
import { Min } from 'class-validator'; // Kita pisah dekorator Min secara eksplisit
import { Type } from 'class-transformer';

export class CreateTiketDto {
  @IsNotEmpty()
  @IsString()
  namaPemesan!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number) 
  jumlahTiket!: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number) 
  wisataId!: number;
}