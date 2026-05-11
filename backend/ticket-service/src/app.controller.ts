import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('tickets')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTickets() {
    return this.appService.getTickets();
  }
}