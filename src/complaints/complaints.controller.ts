import { Controller, Get } from '@nestjs/common';

@Controller()
export class ComplaintsController {
  @Get('complaints')
  getComplaints() {
    return 'Complaints';
  }
}
