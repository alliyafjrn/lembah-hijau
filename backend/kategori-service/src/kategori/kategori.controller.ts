import { Body, Controller, Post, Get, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { KategoriService } from './kategori.service';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';

@Controller('kategori')
export class KategoriController {
    constructor(private readonly kategoriService: KategoriService) { }

    @Post()
    async create(@Body() createKategoriDto: CreateKategoriDto) {
        const data = await this.kategoriService.create(createKategoriDto);

        return {
            success: true,
            message: 'Kategori berhasil dibuat',
            data,
        };
    }

    @Get()
    async findAll() {
        const data = await this.kategoriService.findAll();

        return {
            success: true,
            message: 'Data kategori berhasil diambil',
            data,
        };
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const data = await this.kategoriService.findOne(id);

        return {
            success: true,
            message: 'Detail kategori berhasil diambil',
            data,
        };
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateKategoriDto: UpdateKategoriDto,
    ) {
        const data = await this.kategoriService.update(id, updateKategoriDto);

        return {
            success: true,
            message: 'Kategori berhasil diupdate',
            data,
        };
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const data = await this.kategoriService.remove(id);

        return {
            success: true,
            message: 'Kategori berhasil dihapus',
            data,
        };
    }
}