import React, { useCallback, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { utils } from "ethers";
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
            chainId: utils.hexlify(CHAIN.id),
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
          chainId: utils.hexlify(CHAIN.id),
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
