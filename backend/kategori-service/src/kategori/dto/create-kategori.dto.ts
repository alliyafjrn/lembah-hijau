import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateKategoriDto {
    @ApiProperty({
        example: 'Kebun Binatang',
        description: 'Nama kategori wisata',
    })
    @IsString()
    @IsNotEmpty()
    nama!: string;
}