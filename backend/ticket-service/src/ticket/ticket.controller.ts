import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Post()
  create(@Body() data: any) {
    return this.ticketService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.ticketService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(Number(id));
  }
}