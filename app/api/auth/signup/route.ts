import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { SignupSchema } from '@/zodTypes/SignupSchema';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input using Zod
    const validationResult = SignupSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((error) => ({
        field: error.path[0],
        message: error.message,
      }));

      return NextResponse.json(
        {
          error: 'Validation failed',
          details: errors,
          message: errors[0]?.message || 'Invalid input',
        },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: { id: user.id, email: user.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
