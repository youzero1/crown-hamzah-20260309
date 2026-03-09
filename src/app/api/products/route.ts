import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { Product } from '@/entities/Product';

export async function GET() {
  try {
    const db = await getDatabase();
    const repo = db.getRepository(Product);
    const products = await repo.find({ order: { id: 'ASC' } });
    return NextResponse.json({ products });
  } catch (error) {
    console.error('GET /api/products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, imageUrl, category, stock } = body;
    if (!name || !description || price === undefined || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const db = await getDatabase();
    const repo = db.getRepository(Product);
    const product = repo.create({ name, description, price, imageUrl: imageUrl || '', category, stock: stock ?? 0 });
    await repo.save(product);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
