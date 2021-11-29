import type { Chain } from "types/chain";

export const CHAIN: Chain = {
  id: parseInt(process.env.REACT_APP_CHAIN_ID),
  name: process.env.REACT_APP_CHAIN_NAME,
  rpcUrls: JSON.parse(process.env.REACT_APP_CHAIN_RPC_URLS),
  blockExplorerUrls: JSON.parse(
    process.env.REACT_APP_CHAIN_BLOCK_EXPLORER_URLS
  ),
  nativeCurrency: {
    name: process.env.REACT_APP_CHAIN_CURRENCY_NAME,
    symbol: process.env.REACT_APP_CHAIN_CURRENCY_SYMBOL,
    decimals: parseInt(process.env.REACT_APP_CHAIN_CURRENCY_DECIMALS),
  },
};
