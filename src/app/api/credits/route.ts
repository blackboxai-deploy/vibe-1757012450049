import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch user's credit balance and transaction history
export async function GET() {
  try {
    // Mock credit data
    const creditData = {
      balance: 7500,
      totalEarned: 15000,
      totalSpent: 2500,
      totalConverted: 5000, // Credits converted to cash
      cashEarned: 500, // ₹500 earned so far
      nextConversionTarget: 10000,
      creditsToCashRate: 10, // 10 credits = ₹1
      transactions: [
        {
          id: 'tx_001',
          type: 'earned',
          amount: 1000,
          description: 'Teaching React Fundamentals to Sarah Chen',
          sessionId: 'session_123',
          date: '2024-01-10T15:30:00Z',
          partnerName: 'Sarah Chen'
        },
        {
          id: 'tx_002',
          type: 'earned',
          amount: 1000,
          description: 'Teaching JavaScript Basics to Michael Rodriguez',
          sessionId: 'session_124',
          date: '2024-01-08T14:00:00Z',
          partnerName: 'Michael Rodriguez'
        },
        {
          id: 'tx_003',
          type: 'converted',
          amount: -5000,
          description: 'Converted to cash: ₹500',
          conversionId: 'conv_001',
          date: '2024-01-05T10:00:00Z',
          cashAmount: 500
        },
        {
          id: 'tx_004',
          type: 'spent',
          amount: -1500,
          description: 'Learning Python from Priya Sharma',
          sessionId: 'session_125',
          date: '2024-01-03T16:15:00Z',
          partnerName: 'Priya Sharma'
        },
        {
          id: 'tx_005',
          type: 'earned',
          amount: 1000,
          description: 'Teaching Node.js to Alex Kumar',
          sessionId: 'session_126',
          date: '2023-12-28T11:45:00Z',
          partnerName: 'Alex Kumar'
        }
      ]
    };

    // Calculate conversion progress
    const conversionProgress = (creditData.balance / creditData.nextConversionTarget) * 100;
    const creditsNeeded = Math.max(0, creditData.nextConversionTarget - creditData.balance);

    return NextResponse.json({
      ...creditData,
      conversionProgress,
      creditsNeeded,
      canConvert: creditData.balance >= creditData.nextConversionTarget
    });

  } catch (error) {
    console.error('Credits GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Process credit conversion to cash
export async function POST(req: NextRequest) {
  try {
    const { amount, bankDetails } = await req.json();

    // Input validation
    if (!amount || amount < 10000) {
      return NextResponse.json(
        { error: 'Minimum 10,000 credits required for conversion' },
        { status: 400 }
      );
    }

    if (!bankDetails || !bankDetails.accountNumber || !bankDetails.bankName) {
      return NextResponse.json(
        { error: 'Bank details are required for conversion' },
        { status: 400 }
      );
    }

    // Simulate credit conversion process
    await new Promise(resolve => setTimeout(resolve, 1500));

    const cashAmount = amount / 10; // 10 credits = ₹1
    const conversionId = `conv_${Date.now()}`;

    // Mock conversion record
    const conversion = {
      id: conversionId,
      credits: amount,
      cashAmount,
      status: 'processing',
      bankDetails: {
        accountNumber: bankDetails.accountNumber.slice(-4).padStart(bankDetails.accountNumber.length, '*'),
        bankName: bankDetails.bankName
      },
      estimatedTransferTime: '2-3 business days',
      fee: Math.floor(cashAmount * 0.02), // 2% processing fee
      netAmount: Math.floor(cashAmount * 0.98),
      createdAt: new Date().toISOString(),
      expectedTransferDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    };

    return NextResponse.json({
      message: 'Credit conversion initiated successfully',
      conversion,
      newBalance: 7500 - amount // Mock remaining balance
    });

  } catch (error) {
    console.error('Credits POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update credit balance (for completed sessions)
export async function PUT(req: NextRequest) {
  try {
    const { sessionId, type, amount, partnerName, description } = await req.json();

    if (!sessionId || !type || !amount) {
      return NextResponse.json(
        { error: 'Session ID, type, and amount are required' },
        { status: 400 }
      );
    }

    if (!['earned', 'spent'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid transaction type' },
        { status: 400 }
      );
    }

    // Simulate database update
    await new Promise(resolve => setTimeout(resolve, 800));

    const transaction = {
      id: `tx_${Date.now()}`,
      type,
      amount: type === 'spent' ? -Math.abs(amount) : Math.abs(amount),
      description: description || `${type === 'earned' ? 'Teaching' : 'Learning'} session completed`,
      sessionId,
      partnerName: partnerName || 'Unknown User',
      date: new Date().toISOString()
    };

    const newBalance = type === 'earned' ? 7500 + amount : Math.max(0, 7500 - amount);

    return NextResponse.json({
      message: 'Credits updated successfully',
      transaction,
      newBalance
    });

  } catch (error) {
    console.error('Credits PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}