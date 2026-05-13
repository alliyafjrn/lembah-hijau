import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { AnimalsService } from './animals.service.js';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get()
  getAnimals() {
    return this.animalsService.getAnimals();
  }

  @Post()
  createAnimal(@Body() data: { nama: string; spesies: string; umur: number; habitat: string; lokasi?: string }) {
    return this.animalsService.createAnimal(data);
  }

  @Patch(':id')
  updateAnimal(@Param('id') id: string, @Body() data: { nama?: string; spesies?: string; umur?: number; habitat?: string; lokasi?: string }) {
    return this.animalsService.updateAnimal(Number(id), data);
  }

  @Delete(':id')
  deleteAnimal(@Param('id') id: string) {
    return this.animalsService.deleteAnimal(Number(id));
  }
}