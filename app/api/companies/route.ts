import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = Number.parseInt(session.user.id);

    const companies = await prisma.company.findMany({
      include: {
        _count: {
          select: { problems: true },
        },
        problems: {
          include: {
            userStatus: {
              where: { userId },
              select: { status: true },
            },
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    // Calculate stats for each company
    const companiesWithStats = companies.map((company) => {
      const totalProblems = company.problems.length;
      const completedCount = company.problems.filter(
        (p) => p.userStatus[0]?.status === 'DONE'
      ).length;
      const redoCount = company.problems.filter(
        (p) => p.userStatus[0]?.status === 'REDO'
      ).length;
      const todoCount = totalProblems - completedCount - redoCount;
      const progressPercentage =
        totalProblems > 0
          ? Math.round((completedCount / totalProblems) * 100)
          : 0;

      return {
        id: company.id,
        name: company.name,
        _count: company._count,
        stats: {
          total: totalProblems,
          completed: completedCount,
          redo: redoCount,
          todo: todoCount,
          progress: progressPercentage,
        },
      };
    });

    return NextResponse.json(companiesWithStats);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}
