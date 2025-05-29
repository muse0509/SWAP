// Issue #6: fetchQuote() ユーティリティ (Jupiter /v6/quote)
// Issue #8: getSwapTx() ユーティリティ (Jupiter /v6/swap)

import { PublicKey } from '@solana/web3.js';
import { toast } from 'react-hot-toast'; // Notificationのために必要

const JUPITER_API_URL = process.env.REACT_APP_JUPITER_API_URL || 'https://quote-api.jup.ag/v6';

export interface QuoteResponse {
  inAmount: string;
  outAmount: string;
  priceImpactPct: number;
  routePlan: any[];
  swapMode: string;
  slippageBps: number;
  otherAmountThreshold: string;
  // 他のフィールドも含まれる可能性があります
}

export interface SwapResponse {
  swapTransaction: string; // base64 encoded transaction
}

export const fetchQuote = async (
  inputMint: string,
  outputMint: string,
  amount: string,
  slippageBps: number
): Promise<QuoteResponse | null> => {
  try {
    const response = await fetch(
      `${JUPITER_API_URL}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch quote: ${errorData.error || response.statusText}`);
    }
    const data: QuoteResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching quote:", error);
    toast.error(`見積もり取得エラー: ${error.message}`);
    return null;
  }
};

export const getSwapTx = async (
  quoteResponse: QuoteResponse,
  userPublicKey: PublicKey
): Promise<SwapResponse | null> => {
  try {
    const response = await fetch(`${JUPITER_API_URL}/swap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quoteResponse,
        userPublicKey: userPublicKey.toBase58(),
        wrapUnwrapSol: true, // SOLのラップ/アンラップを自動的に処理
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to get swap transaction: ${errorData.error || response.statusText}`);
    }
    const data: SwapResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error getting swap transaction:", error);
    toast.error(`スワップトランザクション取得エラー: ${error.message}`);
    return null;
  }
};