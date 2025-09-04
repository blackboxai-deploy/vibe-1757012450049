import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Simulate database lookup
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock authentication (in real app, validate against database)
    const mockUser = {
      id: 'user_123',
      name: 'Alex Johnson',
      email: email,
      skills: ['JavaScript', 'React', 'Node.js'],
      interests: ['Python', 'Machine Learning'],
      bio: 'Full-stack developer with 5 years of experience',
      experience: 'intermediate',
      credits: 7500,
      rating: 4.8,
      completedSessions: 15,
      createdAt: '2024-01-01T00:00:00.000Z'
    };

    // Mock JWT token
    const token = btoa(JSON.stringify({ userId: mockUser.id, email }));

    return NextResponse.json({
      message: 'Login successful',
      user: mockUser,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}