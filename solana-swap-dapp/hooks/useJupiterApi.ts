// Issue #6: fetchQuote() ユーティリティ (Jupiter /v6/quote)
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
    return null;
  }
};