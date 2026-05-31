import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { WisataModule } from './wisata/wisata.module';

@Module({
  imports: [PrismaModule, WisataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}