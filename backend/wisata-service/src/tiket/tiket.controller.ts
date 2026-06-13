import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiketService } from './tiket.service';
import { CreateTiketDto } from './dto/create-tiket.dto';
import { UpdateTiketDto } from './dto/update-tiket.dto';

@Controller('tiket')
export class TiketController {
  constructor(private readonly tiketService: TiketService) {}

  @Post()
  async create(@Body() createTiketDto: CreateTiketDto) {
    // Paksa konversi string dari frontend menjadi tipe number murni
    createTiketDto.harga = Number(createTiketDto.harga);
    createTiketDto.jumlahTiket = Number(createTiketDto.jumlahTiket);
    createTiketDto.totalHarga = Number(createTiketDto.totalHarga);
    createTiketDto.wisataId = Number(createTiketDto.wisataId);

    const data = await this.tiketService.create(createTiketDto);

    return {
      success: true,
      message: 'Tiket berhasil dibuat',
      data,
    };
  }

  @Get()
  findAll() {
    return this.tiketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiketDto: UpdateTiketDto) {
    return this.tiketService.update(+id, updateTiketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiketService.remove(+id);
  }
}