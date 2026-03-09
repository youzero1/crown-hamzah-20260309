import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function Header({ title, subtitle, children }: HeaderProps) {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.content}>
          <div>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {children && <div className={styles.actions}>{children}</div>}
        </div>
      </div>
    </div>
  );
}
