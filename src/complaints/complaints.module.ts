import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';

@Module({
  providers: [ComplaintsService],
})
export class ComplaintsModule {}
