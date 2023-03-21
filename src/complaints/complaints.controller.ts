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
  async getComplaints(@Query('page') page: number) {
    return await this.complaintsService.getComplaints(page);
  }

  @Post('complaints')
  @UsePipes(new ZodValidationPipe(createComplaintsSchema))
  async createComplaint(@Body() complaintsDto: CreateComplaintsDto) {
    return await this.complaintsService.createComplaints(complaintsDto);
  }

  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'tag', required: false, type: String })
  @ApiQuery({ name: 'ticket_status', required: false, type: String })
  @Get('filter-results')
  async filterComplaints(
    @Query('page') page: number,
    @Query('tag', TagValidationPipe) tag?: string,
    @Query('ticket_status', TicketStatusValidationPipe) ticket_status?: string,
  ) {
    return await this.complaintsService.getFilteredComplaints(
      page,
      tag,
      ticket_status,
    );
  }

  @Get('complaint')
  async getComplaint(@Query('ticket_id') ticket_id: number) {
    return await this.complaintsService.getComplaint(ticket_id);
  }
}
