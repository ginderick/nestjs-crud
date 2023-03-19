import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateComplaintsDto } from './dto/complaints.dto';
@Injectable()
export class ComplaintsService {
  constructor(private prisma: PrismaService) {}

  async getComplaints() {
    const complaints = this.prisma.complaints.findMany();
    return complaints;
  }

  async createComplaints(createComplaintsDto: CreateComplaintsDto) {
    try {
      const complaints = await this.prisma.complaints.create({
        data: { ...createComplaintsDto },
      });
      return complaints;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new complaint cannot be created with this ticket it',
          );
        }
      }
      throw new BadRequestException();
    }
  }
}
