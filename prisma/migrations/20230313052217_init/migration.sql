-- CreateTable
CREATE TABLE "Complaints" (
    "ticket_id" DOUBLE PRECISION NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "remarks" TEXT,
    "tag" TEXT NOT NULL,
    "ticket_status" TEXT NOT NULL,
    "concerns" TEXT,

    CONSTRAINT "Complaints_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "ticket_id" DOUBLE PRECISION NOT NULL,
    "datetime" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "last_message" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("ticket_id")
);

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Complaints"("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE;
