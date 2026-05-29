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
    findAll() {
        return this.kategoriService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.kategoriService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateKategoriDto: UpdateKategoriDto,
    ) {
        return this.kategoriService.update(id, updateKategoriDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.kategoriService.remove(id);
    }
}