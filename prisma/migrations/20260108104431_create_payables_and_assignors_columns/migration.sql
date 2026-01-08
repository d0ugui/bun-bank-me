-- CreateTable
CREATE TABLE "payables" (
    "id" UUID NOT NULL,
    "value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "emissionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignorId" UUID NOT NULL,

    CONSTRAINT "payables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignors" (
    "id" UUID NOT NULL,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "assignors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assignors_document_key" ON "assignors"("document");

-- CreateIndex
CREATE UNIQUE INDEX "assignors_email_key" ON "assignors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "assignors_phone_key" ON "assignors"("phone");

-- AddForeignKey
ALTER TABLE "payables" ADD CONSTRAINT "payables_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "assignors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
