import { Module } from '@nestjs/common';
import { ComplaintsModule } from './complaints/complaints.module';

@Module({
  imports: [ComplaintsModule],
})
export class AppModule {}
