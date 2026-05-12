import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from '../prisma.service.js';
import { AnimalsController } from '../animals/animals.controller.js';
import { AnimalsService } from '../animals/animals.service.js';
import { TransactionsController } from '../transactions/transactions.controller.js';
import { TransactionsService } from '../transactions/transactions.service.js';

@Module({
  imports: [],
  controllers: [
    AppController, 
    AnimalsController, 
    TransactionsController
  ],
  providers: [
    AppService, 
    PrismaService, 
    AnimalsService, 
    TransactionsService
  ],
})
export class AppModule {}