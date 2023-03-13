import { Injectable } from '@nestjs/common';

@Injectable()
export class ComplaintsService {
  async getComplaints() {
    return [
      {
        ticket_id: '1677830978',
        sender_id: '12345678',
        address: 'Laguna',
        branch: 'Laguna',
        contact: '+639272792254',
        model: 'FZI',
        remarks: null,
        tag: 'parts',
        ticket_status: 'CRITICAL',
        concerns: null,
      },
    ];
  }
}
