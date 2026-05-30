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
import { WisataService } from './wisata.service';
import { CreateWisataDto } from './dto/create-wisata.dto';

@Controller('wisata')
export class WisataController {
  constructor(private readonly wisataService: WisataService) {}

  @Get()
  findAll() {
    return this.wisataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wisataService.findOne(id);
  }

  @Post()
  create(@Body() createWisataDto: CreateWisataDto) {
    return this.wisataService.create(createWisataDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createWisataDto: CreateWisataDto,
  ) {
    return this.wisataService.update(id, createWisataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.wisataService.remove(id);
  }
}