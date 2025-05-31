// src/app/components/Header/Header.tsx
"use client";

import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './Header.module.css'; // 後で作成します

// WalletMultiButtonを動的にインポート (SSR無効)
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export function Header() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logoLink}>
          {/* HomePageのロゴと同様のデザインを使用 */}
          <span className={styles.logoText}>QUANTUM</span>
          <span className={styles.logoAccent}>SWAP</span>
        </Link>
      </div>
      <nav className={styles.navLinks}>
        <Link href="/swap" className={styles.link}>Swap</Link>
        {/* 他のナビゲーションリンクがあればここに追加 */}
        {/* <Link href="/pools" className={styles.link}>Pools</Link> */}
      </nav>
      <div className={styles.walletButtonSection}>
        <WalletMultiButtonDynamic />
      </div>
    </header>
  );
}