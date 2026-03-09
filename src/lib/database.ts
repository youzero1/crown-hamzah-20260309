import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from '@/entities/Product';
import { CartItem } from '@/entities/CartItem';
import { Order } from '@/entities/Order';
import path from 'path';

const dbPath = process.env.DATABASE_PATH || './crown.db';
const resolvedPath = path.isAbsolute(dbPath) ? dbPath : path.resolve(process.cwd(), dbPath);

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: resolvedPath,
  synchronize: true,
  logging: false,
  entities: [Product, CartItem, Order],
});

let initialized = false;

export async function getDatabase(): Promise<DataSource> {
  if (!initialized) {
    await AppDataSource.initialize();
    initialized = true;
    await seedDatabase();
  }
  return AppDataSource;
}

async function seedDatabase(): Promise<void> {
  const productRepo = AppDataSource.getRepository(Product);
  const count = await productRepo.count();
  if (count > 0) return;

  const products: Partial<Product>[] = [
    {
      name: 'Crown Gold Wristwatch',
      description: 'Elegant gold-plated wristwatch with sapphire crystal glass and automatic movement. Water resistant up to 50 meters.',
      price: 299.99,
      imageUrl: '',
      category: 'Accessories',
      stock: 15,
    },
    {
      name: 'Royal Leather Wallet',
      description: 'Hand-stitched genuine leather bifold wallet with RFID blocking technology. Features 8 card slots and a bill compartment.',
      price: 79.99,
      imageUrl: '',
      category: 'Accessories',
      stock: 40,
    },
    {
      name: 'Imperial Silk Tie',
      description: 'Premium 100% pure silk tie with a classic crown pattern. Perfect for formal occasions and business meetings.',
      price: 59.99,
      imageUrl: '',
      category: 'Clothing',
      stock: 25,
    },
    {
      name: 'Sovereign Cologne',
      description: 'Luxury eau de parfum with notes of bergamot, sandalwood, and amber. A long-lasting 50ml bottle for the modern royalty.',
      price: 149.99,
      imageUrl: '',
      category: 'Beauty',
      stock: 30,
    },
    {
      name: 'Regal Cufflinks Set',
      description: 'Sterling silver cufflinks with gold accent crown motif. Comes in an elegant gift box, perfect for any occasion.',
      price: 119.99,
      imageUrl: '',
      category: 'Accessories',
      stock: 20,
    },
    {
      name: 'Prestige Fountain Pen',
      description: 'Handcrafted resin fountain pen with 18k gold nib. Smooth ink flow with a classic design that exudes elegance.',
      price: 189.99,
      imageUrl: '',
      category: 'Stationery',
      stock: 10,
    },
    {
      name: 'Noble Leather Belt',
      description: 'Full-grain leather dress belt with a premium gold buckle. Available in classic black, 35mm width.',
      price: 89.99,
      imageUrl: '',
      category: 'Accessories',
      stock: 35,
    },
    {
      name: 'Majestic Card Holder',
      description: 'Slim minimalist card holder crafted from top-grain leather. Holds up to 10 cards with an easy-access side slot.',
      price: 49.99,
      imageUrl: '',
      category: 'Accessories',
      stock: 50,
    },
  ];

  for (const p of products) {
    const product = productRepo.create(p);
    await productRepo.save(product);
  }
}
