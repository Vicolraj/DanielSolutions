import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

const payloadSchema = z.object({
  email: z.string().email()
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const payload = payloadSchema.parse(await request.json());

    const user = await prisma.adminUser.update({
      where: { id },
      data: { email: payload.email }
    });

    return NextResponse.json({ id: user.id, email: user.email }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', issues: error.issues }, { status: 400 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
      }
      if (error.code === 'P2002') {
        return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
      }
    }

    return NextResponse.json({ error: 'Unable to update admin user' }, { status: 500 });
  }
}
