import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service.js';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/create-transaction.dto.js';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() data: CreateTransactionDto) {
    return this.transactionsService.createTransaction(data);
  }

  @Get()
  findAll() {
    return this.transactionsService.getAllTransactions();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateTransactionDto
  ) {
    return this.transactionsService.updateTransaction(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.deleteTransaction(Number(id));
  }
}