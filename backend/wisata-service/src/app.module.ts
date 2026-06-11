import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { WisataModule } from './wisata/wisata.module';
import { TiketModule } from './tiket/tiket.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PrismaModule, WisataModule, TiketModule],
  controllers: [AppController],
  providers: [
  AppService, PrismaService
],
})
export class AppModule {}