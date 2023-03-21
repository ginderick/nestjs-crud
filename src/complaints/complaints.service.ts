import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateComplaintsDto } from './dto/complaints.dto';
@Injectable()
export class ComplaintsService {
  constructor(private prisma: PrismaService) {}

  async getComplaints() {
    const complaints = await this.prisma.complaints.findMany({
      include: { Messages: true },
    });
    return complaints;
  }

  async createComplaints(createComplaintsDto: CreateComplaintsDto) {
    const ticketId = Date.now() / 1000;

    const message = {
      datetime: Math.floor(ticketId),
      from: createComplaintsDto.name,
      message: createComplaintsDto.message,
      last_message: '',
    };

    try {
      const createComplaints = await this.prisma.complaints.create({
        data: {
          ticket_id: ticketId,
          sender_id: createComplaintsDto.sender_id,
          address: createComplaintsDto.address,
          contact: createComplaintsDto.contact,
          model: createComplaintsDto.model,
          tag: createComplaintsDto.tag,
          ticket_status: createComplaintsDto.ticket_status,
          Messages: {
            create: [{ ...message }],
          },
        },
      });

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

  async getFilteredComplaints(tag?: string, ticket_status?: string) {
    return { tag, ticket_status };
  }
}
