import { NextResponse } from 'next/server';

interface CalcRequest {
  a: number;
  b: number;
  operator: string;
}

export async function POST(request: Request) {
  try {
    const body: CalcRequest = await request.json();
    const { a, b, operator } = body;

    if (a === undefined || b === undefined || !operator) {
      return NextResponse.json({ error: 'a, b, and operator are required' }, { status: 400 });
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
      return NextResponse.json({ error: 'a and b must be numbers' }, { status: 400 });
    }

    let result: number;
    switch (operator) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        if (b === 0) return NextResponse.json({ error: 'Division by zero' }, { status: 400 });
        result = a / b;
        break;
      case '%':
        result = a * (b / 100);
        break;
      default:
        return NextResponse.json({ error: 'Invalid operator' }, { status: 400 });
    }

    return NextResponse.json({ result, expression: `${a} ${operator} ${b} = ${result}` });
  } catch (error) {
    console.error('POST /api/calculator error:', error);
    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 });
  }
}
