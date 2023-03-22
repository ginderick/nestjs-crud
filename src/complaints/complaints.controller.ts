import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import {
  TagValidationPipe,
  TicketStatusValidationPipe,
  ZodValidationPipe,
} from 'src/common/pipes/validation.pipe';
import { ComplaintsService } from './complaints.service';
import {
  ComplaintsStatusDto,
  ComplaintsTagDto,
  CreateComplaintsDto,
} from './dto';
import {
  complaintsStatusSchema,
  complaintsTagSchema,
  createComplaintsSchema,
} from './schema/complaints.schema';

@Controller()
export class ComplaintsController {
  constructor(private complaintsService: ComplaintsService) {}

  @Get('complaint')
  async getComplaint(@Query('ticket_id') ticketId: number) {
    return await this.complaintsService.getComplaint(ticketId);
  }

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

  @Patch('complaints/tags')
  @UsePipes()
  async updateTag(
    @Query('ticket_id') ticketId: number,
    @Body(new ZodValidationPipe(complaintsTagSchema))
    tagComplaintsDto: ComplaintsTagDto,
  ) {
    return await this.complaintsService.updateComplaintTag(
      ticketId,
      tagComplaintsDto,
    );
  }

  @Patch('complaints/ticket-status')
  @UsePipes()
  async updateStatus(
    @Query('ticket_id') ticketId: number,
    @Body(new ZodValidationPipe(complaintsStatusSchema))
    statusComlpaintsDto: ComplaintsStatusDto,
  ) {
    return await this.complaintsService.updateComplaintStatus(
      ticketId,
      statusComlpaintsDto,
    );
  }
}
