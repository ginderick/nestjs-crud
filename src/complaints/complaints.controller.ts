import { Controller, Get } from '@nestjs/common';

@Controller()
export class ComplaintsController {
  @Get('complaints')
  getComplaints() {
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
