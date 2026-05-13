import { ConflictException, HttpStatus } from '@nestjs/common';

export const conflictTiket = async (
  prisma: any,
  message: string,
  nama: string,
  id?: number,
) => {
  const exist = await prisma.findFirst({
    where: {
      nama: nama,
      ...(id ? { NOT: { id: id } } : undefined),
    },
  });

  if (exist) {
    throw new ConflictException({
      success: false,
      message: message,
      metadata: { status: HttpStatus.CONFLICT },
    });
  }

  return nama;
};