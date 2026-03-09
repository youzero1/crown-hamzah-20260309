'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CartItemComponent from '@/components/CartItem';
import Calculator from '@/components/Calculator';
import Header from '@/components/Header';
import styles from './cart.module.css';

interface CartItemData {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

const TAX_RATE = 0.08;
const SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 9.99;

export default function CartPage() {
  const [items, setItems] = useState<CartItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCalc, setShowCalc] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number, quantity: number) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, quantity }),
      });
      if (res.ok) fetchCart();
    } catch { /* ignore */ }
  };

  const handleRemove = async (id: number) => {
    try {
      const res = await fetch(`/api/cart?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchCart();
    } catch { /* ignore */ }
  };

  const handleClearCart = async () => {
    try {
      const res = await fetch('/api/cart?clearAll=true', { method: 'DELETE' });
      if (res.ok) setItems([]);
    } catch { /* ignore */ }
  };

  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const shipping = subtotal > 0 && subtotal < SHIPPING_THRESHOLD ? SHIPPING_COST : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  return (
    <div>
      <Header title="Shopping Cart" subtitle={`${items.length} item type${items.length !== 1 ? 's' : ''} in your cart`}>
        {items.length > 0 && (
          <button className="btn btn-secondary" onClick={handleClearCart} style={{ fontSize: '0.875rem' }}>
            Clear Cart
          </button>
        )}
      </Header>

      <div className="container" style={{ paddingTop: 32, paddingBottom: 48 }}>
        {loading && <div className="loading">Loading cart...</div>}

        {!loading && items.length === 0 && (
          <div className="empty-state">
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>🛒</div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven&apos;t added anything yet.</p>
            <Link href="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className={styles.layout}>
            {/* Left: items */}
            <div className={styles.itemsSection}>
              <div className={styles.itemsList}>
                {items.map((item) => (
                  <CartItemComponent
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdate}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </div>

            {/* Right: summary + calculator */}
            <div className={styles.sidebar}>
              {/* Order summary */}
              <div className={styles.summary}>
                <h3 className={styles.summaryTitle}>Order Summary</h3>
                <div className={styles.summaryRows}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Shipping</span>
                    <span className={shipping === 0 ? styles.free : ''}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className={styles.freeShipNote}>
                      Add ${(SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <div className={styles.summaryRow}>
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className={styles.divider}></div>
                  <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className={`btn btn-primary ${styles.checkoutBtn}`}>
                  Proceed to Checkout
                </button>
                <Link href="/products" className={`btn btn-secondary ${styles.continueBtn}`}>
                  Continue Shopping
                </Link>
              </div>

              {/* Calculator toggle */}
              <div className={styles.calcSection}>
                <button
                  className={styles.calcToggle}
                  onClick={() => setShowCalc(!showCalc)}
                >
                  <span>🧮</span>
                  <span>{showCalc ? 'Hide Calculator' : 'Open Calculator'}</span>
                  <span className={styles.chevron}>{showCalc ? '▲' : '▼'}</span>
                </button>
                {showCalc && (
                  <div className={styles.calcWrapper}>
                    <Calculator />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
