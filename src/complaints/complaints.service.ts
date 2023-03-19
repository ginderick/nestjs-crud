import { Injectable } from '@nestjs/common';
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
    const complaints = this.prisma.complaints.create({
      data: { ...createComplaintsDto },
    });
    return complaints;
  }
}
