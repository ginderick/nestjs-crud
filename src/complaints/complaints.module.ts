import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ComplaintsController } from './complaints.controller';
import { ComplaintsService } from './complaints.service';

@Module({
  controllers: [ComplaintsController],
  providers: [ComplaintsService, PrismaService],
})
export class ComplaintsModule {}
