import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe';
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
  @UsePipes(new JoiValidationPipe(createComplaintsSchema))
  createComplaint(@Body() complaintsDto: CreateComplaintsDto) {
    return this.complaintsService.createComplaints(complaintsDto);
  }
}
