import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, skills, interests, bio, experience } = await req.json();

    // Input validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Simulate database operation
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock user creation
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      skills: skills || [],
      interests: interests || [],
      bio: bio || '',
      experience: experience || 'beginner',
      credits: 0,
      rating: 0,
      completedSessions: 0,
      createdAt: new Date().toISOString()
    };

    // Mock JWT token
    const token = Buffer.from(JSON.stringify({ userId: user.id, email })).toString('base64');

    return NextResponse.json({
      message: 'User registered successfully',
      user,
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}