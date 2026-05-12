import { Controller, Post, Get, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service.js';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() data: { tiketId: number; jumlah: number; namaPembeli: string }) {
    return this.transactionsService.createTransaction(data);
  }

  @Get()
  findAll() {
    return this.transactionsService.getAllTransactions();
  }
}