import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch user's barter proposals
export async function GET() {
  try {
    // Mock barter proposals
    const proposals = [
      {
        id: 1,
        skill: 'Python Fundamentals',
        skillId: 'python',
        partner: {
          name: 'Sarah Chen',
          id: 'user_456',
          rating: 4.9,
          avatar: 'SC',
          completedSessions: 23
        },
        mySkill: 'React Development',
        mySkillId: 'react',
        status: 'pending',
        proposedDate: '2024-01-15',
        message: 'Hi! I\'d love to learn React from you. I have strong Python skills and can teach fundamentals to advanced concepts.',
        createdAt: '2024-01-10T10:00:00Z',
        estimatedDuration: '4 weeks',
        sessionType: 'video'
      },
      {
        id: 2,
        skill: 'Machine Learning Basics',
        skillId: 'ml',
        partner: {
          name: 'Michael Rodriguez',
          id: 'user_789',
          rating: 4.7,
          avatar: 'MR',
          completedSessions: 31
        },
        mySkill: 'JavaScript',
        mySkillId: 'js',
        status: 'accepted',
        proposedDate: '2024-01-18',
        message: 'Great! Let\'s exchange ML knowledge for JavaScript expertise. I\'m excited to learn from you!',
        createdAt: '2024-01-12T14:30:00Z',
        estimatedDuration: '6 weeks',
        sessionType: 'video',
        nextSession: '2024-01-18T15:00:00Z'
      },
      {
        id: 3,
        skill: 'UI/UX Design',
        skillId: 'design',
        partner: {
          name: 'Priya Sharma',
          id: 'user_101',
          rating: 4.8,
          avatar: 'PS',
          completedSessions: 18
        },
        mySkill: 'Node.js',
        mySkillId: 'nodejs',
        status: 'completed',
        proposedDate: '2023-12-20',
        completedDate: '2024-01-05',
        message: 'Thank you for the amazing Node.js sessions! Your design teaching was excellent too.',
        createdAt: '2023-12-15T09:00:00Z',
        estimatedDuration: '5 weeks',
        sessionType: 'video',
        rating: 5,
        feedback: 'Excellent teacher, very patient and knowledgeable!'
      }
    ];

    return NextResponse.json({
      proposals,
      total: proposals.length,
      pending: proposals.filter(p => p.status === 'pending').length,
      active: proposals.filter(p => p.status === 'accepted').length,
      completed: proposals.filter(p => p.status === 'completed').length
    });

  } catch (error) {
    console.error('Barter GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new barter proposal
export async function POST(req: NextRequest) {
  try {
    const { 
      partnerId, 
      skillWanted, 
      skillOffered, 
      message, 
      proposedDate,
      estimatedDuration,
      sessionType 
    } = await req.json();

    // Input validation
    if (!partnerId || !skillWanted || !skillOffered) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Simulate database operation
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock proposal creation
    const newProposal = {
      id: Math.floor(Math.random() * 10000),
      skill: skillWanted,
      partner: {
        id: partnerId,
        name: 'John Doe', // Would fetch from database
        rating: 4.5,
        avatar: 'JD',
        completedSessions: 12
      },
      mySkill: skillOffered,
      status: 'pending',
      proposedDate,
      message: message || '',
      createdAt: new Date().toISOString(),
      estimatedDuration: estimatedDuration || '4 weeks',
      sessionType: sessionType || 'video'
    };

    return NextResponse.json({
      message: 'Barter proposal created successfully',
      proposal: newProposal
    });

  } catch (error) {
    console.error('Barter POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update barter proposal status
export async function PUT(req: NextRequest) {
  try {
    const { proposalId, action, message } = await req.json();

    if (!proposalId || !action) {
      return NextResponse.json(
        { error: 'Proposal ID and action are required' },
        { status: 400 }
      );
    }

    if (!['accept', 'reject', 'complete'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    // Simulate database update
    await new Promise(resolve => setTimeout(resolve, 600));

    const statusMap: { [key: string]: string } = {
      accept: 'accepted',
      reject: 'rejected', 
      complete: 'completed'
    };

    const updatedProposal: any = {
      id: proposalId,
      status: statusMap[action],
      updatedAt: new Date().toISOString(),
      responseMessage: message || ''
    };

    // If accepted, create initial session
    if (action === 'accept') {
      updatedProposal.nextSession = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // Next week
    }

    return NextResponse.json({
      message: `Proposal ${action}ed successfully`,
      proposal: updatedProposal
    });

  } catch (error) {
    console.error('Barter PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}