import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { TicketModule } from './ticket/ticket.module';
import { AnimalsModule } from './animals/animals.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    TicketModule,
    AnimalsModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}