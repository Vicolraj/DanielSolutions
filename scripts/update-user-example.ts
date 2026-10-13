/**
 * Usage:
 * npx tsx scripts/update-user-example.ts <adminUserId> <newEmail>
 */

import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

const argsSchema = z.tuple([z.string().min(1), z.string().email()]);

async function main() {
  const parsed = argsSchema.safeParse([process.argv[2], process.argv[3]]);

  if (!parsed.success) {
    console.error('Provide admin user id and a valid email.');
    process.exit(1);
  }

  const [id, email] = parsed.data;

  try {
    const updated = await prisma.adminUser.update({
      where: { id },
      data: { email }
    });

    console.log('Updated admin user:', updated.id, updated.email);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        console.error('Admin user not found.');
        process.exit(1);
      }

      if (error.code === 'P2002') {
        console.error('Email already exists.');
        process.exit(1);
      }
    }

    console.error('Unexpected error while updating user.');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
