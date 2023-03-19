import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/validation.pipe';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintsDto } from './dto';
import { createComplaintsSchema } from './schema/complaints.schema';

@Controller()
export class ComplaintsController {
  constructor(private complaintsService: ComplaintsService) {}

  @Get('complaints')
  getComplaints() {
    return this.complaintsService.getComplaints();
  }

  @Post('complaints')
  @UsePipes(new ZodValidationPipe(createComplaintsSchema))
  async createComplaint(@Body() complaintsDto: CreateComplaintsDto) {
    return await this.complaintsService.createComplaints(complaintsDto);
  }
}
