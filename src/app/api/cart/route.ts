import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { CartItem } from '@/entities/CartItem';
import { Product } from '@/entities/Product';

export async function GET() {
  try {
    const db = await getDatabase();
    const repo = db.getRepository(CartItem);
    const items = await repo.find({ order: { createdAt: 'ASC' } });
    return NextResponse.json({ items });
  } catch (error) {
    console.error('GET /api/cart error:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, quantity = 1 } = body;
    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }
    const db = await getDatabase();
    const productRepo = db.getRepository(Product);
    const cartRepo = db.getRepository(CartItem);

    const product = await productRepo.findOne({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if already in cart
    const existing = await cartRepo.findOne({ where: { productId } });
    if (existing) {
      existing.quantity += quantity;
      await cartRepo.save(existing);
      return NextResponse.json({ item: existing });
    }

    const item = cartRepo.create({
      productId,
      quantity,
      price: product.price,
      productName: product.name,
      productImage: product.imageUrl || '',
    });
    await cartRepo.save(item);
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error('POST /api/cart error:', error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, quantity } = body;
    if (!id || quantity === undefined) {
      return NextResponse.json({ error: 'id and quantity are required' }, { status: 400 });
    }
    if (quantity < 1) {
      return NextResponse.json({ error: 'Quantity must be at least 1' }, { status: 400 });
    }
    const db = await getDatabase();
    const repo = db.getRepository(CartItem);
    const item = await repo.findOne({ where: { id } });
    if (!item) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    }
    item.quantity = quantity;
    await repo.save(item);
    return NextResponse.json({ item });
  } catch (error) {
    console.error('PUT /api/cart error:', error);
    return NextResponse.json({ error: 'Failed to update cart item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const clearAll = searchParams.get('clearAll');

    const db = await getDatabase();
    const repo = db.getRepository(CartItem);

    if (clearAll === 'true') {
      await repo.clear();
      return NextResponse.json({ success: true });
    }

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }
    const item = await repo.findOne({ where: { id: parseInt(id) } });
    if (!item) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    }
    await repo.remove(item);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/cart error:', error);
    return NextResponse.json({ error: 'Failed to remove cart item' }, { status: 500 });
  }
}
