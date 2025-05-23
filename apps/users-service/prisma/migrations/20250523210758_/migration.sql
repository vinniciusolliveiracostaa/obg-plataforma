-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" JSONB,
ALTER COLUMN "role" SET DEFAULT 'USER';
