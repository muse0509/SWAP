// Issue #4: useTokenList() フック (Token List 取得 & キャッシュ)

import { useState, useEffect } from 'react';
import { TokenInfo, TokenListProvider } from '@solana/spl-token-registry';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { toast } from 'react-hot-toast';

const useTokenList = () => {
  const [tokenList, setTokenList] = useState<TokenInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        const tokens = await new TokenListProvider().resolve();
        const tokenMap = tokens.filterByChainId(103).getList(); // Devnetのトークンリストを取得
        setTokenList(tokenMap);
      } catch (err) {
        console.error("Failed to fetch token list:", err);
        setError("トークンリストの取得に失敗しました。");
        toast.error("トークンリストの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    fetchTokens();
  }, []);

  return { tokenList, loading, error };
};

export default useTokenList;