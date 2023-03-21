export class CreateComplaintsDto {
  sender_id: number;
  name: string;
  address: string;
  contact: string;
  model: string;
  remarks: string;
  message: string;
  tag: string;
  ticket_status: string;
  concerns: string;
}

export class ComplaintsTagDto {
  tag: string;
}
