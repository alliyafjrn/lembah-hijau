import { Controller, Get } from '@nestjs/common';
import { AnimalsService } from './animals.service.js';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get()
  getAnimals() {
    return this.animalsService.getAnimals();
  }
}