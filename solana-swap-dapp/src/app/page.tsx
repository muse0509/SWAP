// src/app/page.tsx
'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.background}>
          <div className={styles.grid}></div>
          <div className={styles.glow}></div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.logoSection}>
            <h1 className={styles.logo}>
              <span className={styles.logoText}>QUANTUM</span>
              <span className={styles.logoAccent}>SWAP</span>
            </h1>
            <div className={styles.tagline}>
              Next-Generation Decentralized Exchange
            </div>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Lightning Fast</h3>
              <p>Execute swaps in milliseconds with our optimized routing engine</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔒</div>
              <h3>Secure & Trustless</h3>
              <p>Your funds never leave your wallet. Complete decentralization guaranteed</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>💎</div>
              <h3>Best Rates</h3>
              <p>AI-powered price discovery ensures you get optimal swap rates</p>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>$2.3B+</div>
              <div className={styles.statLabel}>Total Volume</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>150K+</div>
              <div className={styles.statLabel}>Active Users</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>0.1%</div>
              <div className={styles.statLabel}>Platform Fee</div>
            </div>
          </div>

          <div className={styles.cta}>
            <Link href="/swap" className={styles.enterButton}>
              <span className={styles.buttonText}>Enter the App</span>
              <span className={styles.buttonArrow}>→</span>
            </Link>
            <p className={styles.disclaimer}>
              Connect your wallet and start trading instantly
            </p>
          </div>
        </div>
      </div>

      <div className={styles.particles}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </main>
  );
}