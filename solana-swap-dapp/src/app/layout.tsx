// src/app/layout.tsx
import './globals.css';
import '@solana/wallet-adapter-react-ui/styles.css'; // Wallet Adapterのスタイル
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProviders } from './providers'; // Wallet AdapterのProvider
import { Header } from './components/Header/Header'; // 作成したHeaderコンポーネントをインポート

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QUANTUM SWAP', // あなたのプロジェクト名に合わせて変更
  description: 'Next-Generation Decentralized Exchange',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>
          <Header /> {/* Headerコンポーネントをここに追加 */}
          <div style={{ paddingTop: '80px' }}> {/* ヘッダーの高さ分だけコンテンツ開始位置を調整 (ヘッダーがfixed/stickyの場合) */}
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}