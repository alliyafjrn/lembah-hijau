import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller('tickets')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTickets() {
    return this.appService.getTickets();
  }

  @Post()
  createTicket(@Body() data: { nama: string; harga: number; stok: number; deskripsi?: string }) {
    return this.appService.createTicket(data);
  }

  @Patch(':id')
  updateTicket(
    @Param('id') id: string,
    @Body() data: { nama?: string; harga?: number; stok?: number; deskripsi?: string },
  ) {
    return this.appService.updateTicket(Number(id), data);
  }
}