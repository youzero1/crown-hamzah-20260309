'use client';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import styles from './products.module.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

const CATEGORIES = ['All', 'Accessories', 'Clothing', 'Beauty', 'Stationery'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let list = [...products];
    if (category !== 'All') list = list.filter((p) => p.category === category);
    if (search.trim()) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    setFiltered(list);
  }, [products, category, search, sort]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title="Our Products" subtitle="Handpicked premium items for the discerning shopper." />
      <div className="container" style={{ paddingTop: 32, paddingBottom: 48 }}>
        {/* Filters */}
        <div className={styles.filterBar}>
          <div className={styles.categories}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.catBtn} ${category === cat ? styles.catActive : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className={styles.filterRight}>
            <input
              className={styles.search}
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className={styles.sort}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </div>
        </div>

        {loading && <div className="loading">Loading products...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try adjusting your filters or search term.</p>
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <>
            <p className={styles.count}>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
            <div className={styles.grid}>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={fetchProducts} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
