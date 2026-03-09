'use client';
import { useState } from 'react';
import styles from './ProductCard.module.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

const categoryEmojis: Record<string, string> = {
  Accessories: '💍',
  Clothing: '👔',
  Beauty: '✨',
  Stationery: '🖊️',
  Default: '🛍️',
};

const categoryColors: Record<string, string> = {
  Accessories: '#9b59b6',
  Clothing: '#3498db',
  Beauty: '#e91e63',
  Stationery: '#009688',
  Default: '#607d8b',
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const emoji = categoryEmojis[product.category] || categoryEmojis.Default;
  const color = categoryColors[product.category] || categoryColors.Default;

  const handleAddToCart = async () => {
    if (adding) return;
    setAdding(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      if (res.ok) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
        onAddToCart?.();
      }
    } catch {
      // ignore
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer} style={{ background: `linear-gradient(135deg, ${color}22, ${color}11)` }}>
        <span className={styles.emoji}>{emoji}</span>
        <div className={styles.categoryBadge} style={{ background: `${color}22`, color, borderColor: `${color}44` }}>
          {product.category}
        </div>
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <div className={styles.priceGroup}>
            <span className={styles.price}>${Number(product.price).toFixed(2)}</span>
            <span className={styles.stock}>{product.stock} in stock</span>
          </div>
          <button
            className={`${styles.addBtn} ${added ? styles.added : ''}`}
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
          >
            {adding ? '...' : added ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
