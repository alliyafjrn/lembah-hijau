import { Body, Controller, Post, Get, Param, ParseIntPipe } from '@nestjs/common';
import { KategoriService } from './kategori.service';
import { CreateKategoriDto } from './dto/create-kategori.dto';

@Controller('kategori')
export class KategoriController {
    constructor(private readonly kategoriService: KategoriService) { }

    @Post()
    create(@Body() createKategoriDto: CreateKategoriDto) {
        return this.kategoriService.create(createKategoriDto);
    }

    @Get()
    findAll() {
        return this.kategoriService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.kategoriService.findOne(id);
    }
}