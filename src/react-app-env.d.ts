/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_CHAIN_ID: string;
    REACT_APP_CHAIN_NAME: string;
    REACT_APP_CHAIN_RPC_URLS: string;
    REACT_APP_CHAIN_BLOCK_EXPLORER_URLS: string;
    REACT_APP_CHAIN_CURRENCY_NAME: string;
    REACT_APP_CHAIN_CURRENCY_SYMBOL: string;
    REACT_APP_CHAIN_CURRENCY_DECIMALS: string;

    REACT_APP_FACTORY_ADDRESS: string;
    REACT_APP_TOKEN_ADDRESS: string;
  }
}
