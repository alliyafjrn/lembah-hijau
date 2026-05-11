import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from '../prisma.service.js';
import { AnimalsController } from '../animals/animals.controller.js';
import { AnimalsService } from '../animals/animals.service.js';

@Module({
  imports: [],
  controllers: [AppController, AnimalsController],
  providers: [AppService, PrismaService, AnimalsService],
})
export class AppModule {}