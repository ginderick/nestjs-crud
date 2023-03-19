import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateComplaintsDto } from './dto/complaints.dto';
@Injectable()
export class ComplaintsService {
  constructor(private prisma: PrismaService) {}

  async getComplaints() {
    const complaints = await this.prisma.complaints.findMany();
    return complaints;
  }

  async createComplaints(createComplaintsDto: CreateComplaintsDto) {
    const ticketId = Date.now() / 1000;
    const complaints = {
      ticket_id: ticketId,
      sender_id: createComplaintsDto.sender_id,
      address: createComplaintsDto.address,
      contact: createComplaintsDto.contact,
      model: createComplaintsDto.model,
      tag: createComplaintsDto.tag,
      ticket_status: createComplaintsDto.ticket_status,
    };

    const message = {
      ticket_id: ticketId,
      datetime: Math.floor(ticketId),
      from: createComplaintsDto.name,
      message: createComplaintsDto.message,
      last_message: '',
    };

    try {
      const createComplaints = await this.prisma.$transaction([
        this.prisma.complaints.create({
          data: { ...complaints },
        }),
        this.prisma.messages.create({
          data: { ...message },
        }),
      ]);

      return createComplaints;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new complaint cannot be created with this ticket id',
          );
        }
      }
      console.log(error);
      throw new BadRequestException('Validation');
    }
  }
}
