import { Controller, Get, Post, Body } from '@nestjs/common';
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
}