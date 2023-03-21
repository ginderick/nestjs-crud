import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const ticketId = Date.now() / 1000;

  const complaints_1 = await prisma.complaints.create({
    data: {
      ticket_id: ticketId,
      sender_id: 1234,
      address: 'Laguna',
      contact: '+639272792254',
      model: 'FZI',
      tag: 'PARTS',
      ticket_status: 'NEW',
      Messages: {
        create: [
          {
            datetime: Math.floor(ticketId),
            from: 'Gin Derick Magno',
            message: 'Hello',
            last_message: '',
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
