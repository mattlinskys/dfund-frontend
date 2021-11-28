import React, { useMemo } from "react";
import { useEthers } from "@usedapp/core";
import { WALLET_HASH } from "constants/hashes";
import WalletDialog from "components/wallet/WalletDialog";
import useHashDisclosure from "hooks/useHashDisclosure";

const WalletDialogProvider: React.FC = () => {
  const { account: address, deactivate } = useEthers();
  const account = useMemo(
    () =>
      address
        ? {
            address: address!,
            // TODO:
            balance: "0",
          }
        : undefined,
    [address]
  );
  const { isVisible, onClose } = useHashDisclosure(WALLET_HASH, !!account);

  return (
    <WalletDialog
      isOpen={isVisible}
      account={account}
      onClose={onClose}
      onDisconnect={deactivate}
    />
  );
};

export default WalletDialogProvider;
