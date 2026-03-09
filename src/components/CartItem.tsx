'use client';
import styles from './CartItem.module.css';

interface CartItemData {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

interface CartItemProps {
  item: CartItemData;
  onUpdate: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const getEmoji = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes('watch')) return '⌚';
  if (lower.includes('wallet')) return '👜';
  if (lower.includes('tie')) return '👔';
  if (lower.includes('cologne') || lower.includes('perfume')) return '🧴';
  if (lower.includes('cufflink')) return '🔗';
  if (lower.includes('pen')) return '🖊️';
  if (lower.includes('belt')) return '🔲';
  if (lower.includes('card')) return '💳';
  return '🛍️';
};

export default function CartItemComponent({ item, onUpdate, onRemove }: CartItemProps) {
  const subtotal = Number(item.price) * item.quantity;

  return (
    <div className={styles.item}>
      <div className={styles.imageBox}>
        <span className={styles.emoji}>{getEmoji(item.productName)}</span>
      </div>
      <div className={styles.info}>
        <h4 className={styles.name}>{item.productName}</h4>
        <p className={styles.unitPrice}>${Number(item.price).toFixed(2)} each</p>
      </div>
      <div className={styles.controls}>
        <button
          className={styles.qtyBtn}
          onClick={() => onUpdate(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          −
        </button>
        <span className={styles.qty}>{item.quantity}</span>
        <button
          className={styles.qtyBtn}
          onClick={() => onUpdate(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>
      <div className={styles.subtotal}>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <button className={styles.removeBtn} onClick={() => onRemove(item.id)} title="Remove item">
        ✕
      </button>
    </div>
  );
}
