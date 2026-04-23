import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

import { PrismaModule } from '../prisma/prisma.module';
import { RatesModule } from '../rates/rates.module';

@Module({
  imports: [PrismaModule, RatesModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
