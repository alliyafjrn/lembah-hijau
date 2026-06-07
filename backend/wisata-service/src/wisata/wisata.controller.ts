import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { WisataService } from './wisata.service';
import { CreateWisataDto } from './dto/create-wisata.dto';

@ApiTags('Wisata')
@Controller('wisata')
export class WisataController {
  constructor(private readonly wisataService: WisataService) {}

  @ApiOperation({ summary: 'Mengambil semua data wisata' })
  @Get()
  findAll() {
    return this.wisataService.findAll();
  }

  @ApiOperation({ summary: 'Mengambil detail wisata berdasarkan ID' })
  @ApiParam({ name: 'id', example: 1 })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wisataService.findOne(id);
  }

  @ApiOperation({ summary: 'Menambahkan data wisata' })
  @Post()
  create(@Body() createWisataDto: CreateWisataDto) {
    return this.wisataService.create(createWisataDto);
  }

  @ApiOperation({ summary: 'Mengubah data wisata' })
  @ApiParam({ name: 'id', example: 1 })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createWisataDto: CreateWisataDto,
  ) {
    return this.wisataService.update(id, createWisataDto);
  }

  @ApiOperation({ summary: 'Menghapus data wisata' })
  @ApiParam({ name: 'id', example: 1 })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.wisataService.remove(id);
  }
}