import { Controller, Get } from '@nestjs/common';
import { WisataService } from './wisata.service';

@Controller('wisata')
export class WisataController {
  constructor(private readonly wisataService: WisataService) {}

  @Get()
  findAll() {
    return this.wisataService.findAll();
  }
}