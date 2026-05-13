import { HttpStatus, NotFoundException } from '@nestjs/common';

export const notExistTiket = async (
  prisma: any,
  id: number,
  message: string,
) => {
  const data = await prisma.findUnique({
    where: { id: id },
  });

  if (!data) {
    throw new NotFoundException({
      success: false,
      message: message,
      metadata: { status: HttpStatus.NOT_FOUND },
    });
  }

  return data;
};