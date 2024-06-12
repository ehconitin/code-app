-- CreateTable
CREATE TABLE "Codestore" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "stdin" TEXT NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "output" VARCHAR(500) NOT NULL,

    CONSTRAINT "Codestore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Code" (
    "codeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "stdin" TEXT NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "output" VARCHAR(1500) NOT NULL,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("codeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Codestore_username_key" ON "Codestore"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Code" ADD CONSTRAINT "Code_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Code" ADD CONSTRAINT "Code_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
