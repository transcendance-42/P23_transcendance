-- AlterTable
ALTER TABLE "dogs" ADD COLUMN     "dog_formular_path" VARCHAR(250),
ADD COLUMN     "dog_formular_type" VARCHAR(100);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "mime_type" SET DATA TYPE VARCHAR(100);
