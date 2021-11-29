import React, { useCallback, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { CHAIN } from "app/chain";
import WrongChainDialog from "components/base/WrongChainDialog";
import useWallet from "hooks/useWallet";

const WrongChainDialogProvider: React.FC = () => {
  const { library } = useEthers();
  const { isChainIdWrong } = useWallet();

  useEffect(() => {
    if (isChainIdWrong) {
      library?.provider?.request?.({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: `0x${CHAIN.id.toString(16)}`,
          },
        ],
      });
    }
  }, []);

  const handleAddRequest = useCallback(() => {
    library?.provider?.request?.({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `0x${CHAIN.id.toString(16)}`,
          chainName: CHAIN.name,
          rpcUrls: CHAIN.rpcUrls,
          blockExplorerUrls: CHAIN.blockExplorerUrls,
          nativeCurrency: CHAIN.nativeCurrency,
        },
      ],
    });
  }, [library]);

  return (
    <WrongChainDialog
      isOpen={isChainIdWrong}
      chain={CHAIN}
      onAddRequest={handleAddRequest}
    />
  );
};

export default WrongChainDialogProvider;
