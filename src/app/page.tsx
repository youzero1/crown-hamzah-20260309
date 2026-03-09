import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Crown – Premium E-Commerce',
  description: 'Discover premium products with a royal shopping experience.',
};

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroCrown}>♛</div>
            <h1 className={styles.heroTitle}>
              Welcome to <span className={styles.goldText}>Crown</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Discover a curated collection of premium accessories, clothing, and lifestyle products
              crafted for those who appreciate the finer things in life.
            </p>
            <div className={styles.heroBtns}>
              <Link href="/products" className={`btn btn-primary ${styles.heroBtn}`}>
                Shop Now
              </Link>
              <Link href="/calculator" className={`btn btn-secondary ${styles.heroBtn}`}>
                Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Why Choose Crown?</h2>
          <div className={`grid-3 ${styles.featuresGrid}`}>
            {[
              { icon: '👑', title: 'Premium Quality', desc: 'Every product is handpicked for excellence and craftsmanship.' },
              { icon: '🛡️', title: 'Secure Shopping', desc: 'Your data and transactions are always protected with us.' },
              { icon: '🚀', title: 'Fast Delivery', desc: 'Express shipping available on all orders. Track in real time.' },
              { icon: '🔄', title: 'Easy Returns', desc: '30-day hassle-free return policy on all purchases.' },
              { icon: '🧮', title: 'Smart Calculator', desc: 'Built-in calculator to calculate totals, discounts & taxes.' },
              { icon: '🎁', title: 'Gift Wrapping', desc: 'Complimentary gift wrapping available at checkout.' },
            ].map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Ready to Shop Royal?</h2>
            <p className={styles.ctaDesc}>Explore our exclusive collection of premium products.</p>
            <Link href="/products" className={`btn btn-primary ${styles.ctaBtn}`}>
              Browse Products →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
