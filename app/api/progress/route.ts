import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { problemId, status } = await request.json();
    const userId = Number.parseInt(session.user.id);

    const progress = await prisma.userProblemStatus.upsert({
      where: {
        userId_problemId: {
          userId,
          problemId: Number.parseInt(problemId),
        },
      },
      update: { status },
      create: {
        userId,
        problemId: Number.parseInt(problemId),
        status,
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
