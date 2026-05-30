import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { WisataController } from './wisata.controller';
import { WisataService } from './wisata.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    HttpModule,
  ],
  controllers: [WisataController],
  providers: [WisataService],
})
export class WisataModule {}