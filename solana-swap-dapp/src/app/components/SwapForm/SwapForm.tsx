// src/app/components/SwapForm/SwapForm.tsx
"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react'; // useEffect と useRef をインポート
import { gsap } from 'gsap'; // GSAPをインポート
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import styles from './SwapForm.module.css';

// WalletMultiButtonDynamic の定義 (前回同様)
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

// TokenInfo, dummyTokens の定義 (前回同様)
interface TokenInfo {
  mint: string;
  symbol: string;
  name: string;
  logoURI?: string;
}
const dummyTokens: TokenInfo[] = [
  { mint: 'So11111111111111111111111111111111111111112', symbol: 'SOL', name: 'Solana', logoURI: '/next.svg' },
  { mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', symbol: 'USDC', name: 'USD Coin', logoURI: '/vercel.svg' },
  { mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', symbol: 'USDT', name: 'Tether USD', logoURI: '/file.svg' },
];


export function SwapForm() {
  const { publicKey, connected } = useWallet();
  // ...既存のstate...
  const [fromTokenSymbol, setFromTokenSymbol] = useState<string>(dummyTokens[0].symbol);
  const [toTokenSymbol, setToTokenSymbol] = useState<string>(dummyTokens[1].symbol);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');

  const fromToken = useMemo(() => dummyTokens.find(t => t.symbol === fromTokenSymbol), [fromTokenSymbol]);
  const toToken = useMemo(() => dummyTokens.find(t => t.symbol === toTokenSymbol), [toTokenSymbol]);


  // GSAPでアニメーションさせる要素のためのrefを作成
  const swapFormRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const fromGroupRef = useRef<HTMLDivElement>(null);
  const toGroupRef = useRef<HTMLDivElement>(null);
  const swapButtonRef = useRef<HTMLButtonElement>(null);
  const walletButtonContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // コンポーネントがマウントされたらアニメーションを実行
    const formEl = swapFormRef.current;
    const titleEl = titleRef.current;
    const walletButtonContainerEl = walletButtonContainerRef.current;
    const fromGroupEl = fromGroupRef.current;
    const toGroupEl = toGroupRef.current;
    const swapButtonEl = swapButtonRef.current;


    if (formEl) {
        // フォーム全体の初期状態（アニメーション前）
        gsap.set(formEl, { opacity: 0, y: 50 });
        // フォーム全体をフェードイン＆スライドアップ
        gsap.to(formEl, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.1 // 少し遅延させて表示
        });
    }

    // フォーム内の要素を順番にアニメーション (Timelineを使用)
    const tl = gsap.timeline({ delay: 0.4 }); // フォーム表示後に開始

    if (titleEl) {
        tl.fromTo(titleEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, "-=0.2"); // 少し重ねる
    }
    if (walletButtonContainerEl) {
        tl.fromTo(walletButtonContainerEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, "-=0.3");
    }
    if (fromGroupEl) {
        tl.fromTo(fromGroupEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, "-=0.3");
    }
    if (toGroupEl) {
        tl.fromTo(toGroupEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, "-=0.3");
    }
    if (swapButtonEl) {
        tl.fromTo(swapButtonEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, "-=0.3");
    }

  }, []); // 空の依存配列で、マウント時に1回だけ実行

  // ...既存のハンドラ関数...
  const handleSwap = () => { /* ... */ };
  const handleFromTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => { /* ... */ };
  const handleToTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => { /* ... */ };


  return (
    <div className={styles.swapFormContainer} ref={swapFormRef}> {/* refをコンテナにアタッチ */}
      <h2 ref={titleRef}>Token Swap</h2> {/* refをタイトルにアタッチ */}
      <div className={styles.walletButtonContainer} ref={walletButtonContainerRef}>
        <WalletMultiButtonDynamic />
      </div>

      {connected && publicKey && (
        <p className={styles.walletInfo}>Connected: {publicKey.toBase58().substring(0,6)}...{publicKey.toBase58().substring(publicKey.toBase58().length - 4)}</p>
      )}

      <div className={styles.formGroup} ref={fromGroupRef}> {/* refをFromセクションにアタッチ */}
        <label htmlFor="fromToken">From:</label>
        <div className={styles.tokenInputGroup}>
          <select id="fromToken" value={fromTokenSymbol} onChange={handleFromTokenChange} className={styles.tokenSelect}>
            {dummyTokens.map(token => (
              <option key={token.mint} value={token.symbol}>
                {token.symbol} ({token.name})
              </option>
            ))}
          </select>
          <input
            type="number"
            id="fromAmount"
            value={fromAmount}
            onChange={(e) => { setFromAmount(e.target.value); setToAmount(''); }}
            placeholder="Amount"
            className={styles.amountInput}
          />
        </div>
        {fromToken?.logoURI && <img src={fromToken.logoURI} alt={fromToken.symbol} className={styles.tokenLogo} />}
      </div>

      <div className={styles.swapIconContainer}>
        <span>&#x21c5;</span>
      </div>

      <div className={styles.formGroup} ref={toGroupRef}> {/* refをToセクションにアタッチ */}
        <label htmlFor="toToken">To:</label>
        <div className={styles.tokenInputGroup}>
          <select id="toToken" value={toTokenSymbol} onChange={handleToTokenChange} className={styles.tokenSelect}>
            {dummyTokens.filter(token => token.symbol !== fromTokenSymbol).map(token => (
              <option key={token.mint} value={token.symbol} disabled={token.symbol === fromTokenSymbol}>
                {token.symbol} ({token.name})
              </option>
            ))}
          </select>
          <input
            type="number"
            id="toAmount"
            value={toAmount}
            placeholder="Estimated Amount"
            readOnly
            className={styles.amountInput}
          />
        </div>
        {toToken?.logoURI && <img src={toToken.logoURI} alt={toToken.symbol} className={styles.tokenLogo} />}
      </div>

      <button ref={swapButtonRef} onClick={handleSwap} className={styles.swapButton} disabled={!connected || !fromAmount || parseFloat(fromAmount) <= 0}>
        {connected ? 'Swap' : 'Connect Wallet to Swap'}
      </button>
    </div>
  );
}