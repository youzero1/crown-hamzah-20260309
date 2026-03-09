import type { Metadata } from 'next';
import Calculator from '@/components/Calculator';
import Header from '@/components/Header';
import styles from './calculator.module.css';

export const metadata: Metadata = {
  title: 'Calculator',
  description: 'Built-in shopping calculator for discounts, taxes, and totals.',
};

export default function CalculatorPage() {
  return (
    <div>
      <Header
        title="Shopping Calculator"
        subtitle="Calculate totals, discounts, tax amounts, and more."
      />
      <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
        <div className={styles.layout}>
          <div className={styles.calcCol}>
            <Calculator />
          </div>
          <div className={styles.tipsCol}>
            <div className={styles.tipsCard}>
              <h3 className={styles.tipsTitle}>💡 Calculator Tips</h3>
              <div className={styles.tipsList}>
                {[
                  { title: 'Calculate Discount', desc: 'Enter price → × → discount rate → % → =', example: 'e.g. 299.99 × 20 % =' },
                  { title: 'Calculate Tax', desc: 'Enter price → × → tax rate → % → =', example: 'e.g. 150 × 8 % =' },
                  { title: 'Total with Tax', desc: 'Enter price → + → tax rate → % → =', example: 'e.g. 100 + 8 % =' },
                  { title: 'Split Bill', desc: 'Enter total → ÷ → number of people → =', example: 'e.g. 249.97 ÷ 3 =' },
                  { title: 'Percentage of Price', desc: 'Enter percent → % to get decimal value', example: 'e.g. 15 % = 0.15' },
                ].map((tip) => (
                  <div key={tip.title} className={styles.tip}>
                    <h4 className={styles.tipTitle}>{tip.title}</h4>
                    <p className={styles.tipDesc}>{tip.desc}</p>
                    <code className={styles.tipExample}>{tip.example}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.quickCard}>
              <h3 className={styles.tipsTitle}>📊 Tax Reference</h3>
              <div className={styles.taxTable}>
                {[
                  { label: 'Standard (8%)', rate: '8%' },
                  { label: 'Reduced (5%)', rate: '5%' },
                  { label: 'High (12%)', rate: '12%' },
                  { label: 'Premium (15%)', rate: '15%' },
                  { label: 'Luxury (20%)', rate: '20%' },
                ].map((row) => (
                  <div key={row.label} className={styles.taxRow}>
                    <span>{row.label}</span>
                    <span className={styles.taxRate}>{row.rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
