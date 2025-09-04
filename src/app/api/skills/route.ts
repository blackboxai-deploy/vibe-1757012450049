import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Mock skills database
    const skills = [
      {
        id: 'js',
        name: 'JavaScript',
        category: 'Programming',
        description: 'Modern JavaScript programming including ES6+ features',
        teachersCount: 245,
        averageRating: 4.7,
        difficulty: 'Intermediate',
        estimatedDuration: '4-6 weeks',
        topics: ['Variables & Functions', 'DOM Manipulation', 'Async Programming', 'Modern ES6+']
      },
      {
        id: 'react',
        name: 'React',
        category: 'Frontend',
        description: 'Build modern user interfaces with React and hooks',
        teachersCount: 189,
        averageRating: 4.8,
        difficulty: 'Intermediate',
        estimatedDuration: '6-8 weeks',
        topics: ['Components & JSX', 'State Management', 'Hooks', 'Routing']
      },
      {
        id: 'python',
        name: 'Python',
        category: 'Programming',
        description: 'Learn Python fundamentals and advanced concepts',
        teachersCount: 312,
        averageRating: 4.6,
        difficulty: 'Beginner',
        estimatedDuration: '3-5 weeks',
        topics: ['Syntax & Variables', 'Data Structures', 'OOP', 'Libraries']
      },
      {
        id: 'ml',
        name: 'Machine Learning',
        category: 'Data Science',
        description: 'Introduction to ML algorithms and practical applications',
        teachersCount: 98,
        averageRating: 4.5,
        difficulty: 'Advanced',
        estimatedDuration: '8-12 weeks',
        topics: ['Supervised Learning', 'Neural Networks', 'Data Processing', 'Model Evaluation']
      },
      {
        id: 'design',
        name: 'UI/UX Design',
        category: 'Design',
        description: 'Create beautiful and functional user interfaces',
        teachersCount: 156,
        averageRating: 4.7,
        difficulty: 'Intermediate',
        estimatedDuration: '6-8 weeks',
        topics: ['Design Principles', 'Prototyping', 'User Research', 'Figma/Sketch']
      },
      {
        id: 'photography',
        name: 'Photography',
        category: 'Creative',
        description: 'Master composition, lighting, and photo editing',
        teachersCount: 203,
        averageRating: 4.6,
        difficulty: 'Beginner',
        estimatedDuration: '4-6 weeks',
        topics: ['Camera Basics', 'Composition', 'Lighting', 'Post-Processing']
      },
      {
        id: 'marketing',
        name: 'Digital Marketing',
        category: 'Business',
        description: 'Learn modern digital marketing strategies and tools',
        teachersCount: 134,
        averageRating: 4.4,
        difficulty: 'Intermediate',
        estimatedDuration: '5-7 weeks',
        topics: ['SEO/SEM', 'Social Media', 'Content Marketing', 'Analytics']
      },
      {
        id: 'nodejs',
        name: 'Node.js',
        category: 'Backend',
        description: 'Build scalable backend applications with Node.js',
        teachersCount: 167,
        averageRating: 4.5,
        difficulty: 'Intermediate',
        estimatedDuration: '6-8 weeks',
        topics: ['Express.js', 'Database Integration', 'API Development', 'Authentication']
      }
    ];

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const search = searchParams.get('search');

    let filteredSkills = skills;

    if (category) {
      filteredSkills = filteredSkills.filter(skill => 
        skill.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (difficulty) {
      filteredSkills = filteredSkills.filter(skill => 
        skill.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    if (search) {
      filteredSkills = filteredSkills.filter(skill =>
        skill.name.toLowerCase().includes(search.toLowerCase()) ||
        skill.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    return NextResponse.json({
      skills: filteredSkills,
      total: filteredSkills.length,
      categories: ['Programming', 'Frontend', 'Backend', 'Data Science', 'Design', 'Creative', 'Business'],
      difficulties: ['Beginner', 'Intermediate', 'Advanced']
    });

  } catch (error) {
    console.error('Skills API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}