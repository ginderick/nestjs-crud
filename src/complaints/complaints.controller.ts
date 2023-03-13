import { Controller, Get } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';

@Controller()
export class ComplaintsController {
  constructor(private complaintsService: ComplaintsService) {}

  @Get('complaints')
  getComplaints() {
    return this.complaintsService.getComplaints();
  }
}
