import { useEthers } from "@usedapp/core";
import { CHAIN } from "app/chain";

const useWallet = () => {
  const { chainId } = useEthers();
  const isChainIdWrong = chainId !== undefined && chainId !== CHAIN.id;

  return { isChainIdWrong };
};

export default useWallet;
