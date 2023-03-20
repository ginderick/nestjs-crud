import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import {
  TagValidationPipe,
  TicketStatusValidationPipe,
  ZodValidationPipe,
} from 'src/common/pipes/validation.pipe';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintsDto } from './dto';
import { createComplaintsSchema } from './schema/complaints.schema';

@Controller()
export class ComplaintsController {
  constructor(private complaintsService: ComplaintsService) {}

  @Get('complaints')
  async getComplaints() {
    return await this.complaintsService.getComplaints();
  }

  @Post('complaints')
  @UsePipes(new ZodValidationPipe(createComplaintsSchema))
  async createComplaint(@Body() complaintsDto: CreateComplaintsDto) {
    return await this.complaintsService.createComplaints(complaintsDto);
  }

  @ApiQuery({ name: 'tag', required: false, type: String })
  @ApiQuery({ name: 'ticket_status', required: false, type: String })
  @Get('filter-results')
  async filterComplaints(
    @Query('tag', TagValidationPipe) tag?: string,
    @Query('ticket_status', TicketStatusValidationPipe) ticket_status?: string,
  ) {
    return { ticket_status };
  }
}
