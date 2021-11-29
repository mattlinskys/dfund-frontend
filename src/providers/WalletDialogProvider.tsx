import React, { useMemo } from "react";
import { useEthers } from "@usedapp/core";
import { WALLET_HASH } from "constants/hashes";
import WalletDialog from "components/wallet/WalletDialog";
import useHashDisclosure from "hooks/useHashDisclosure";
import useFundBalance from "hooks/useFundBalance";

const WalletDialogProvider: React.FC = () => {
  const { account: address, deactivate } = useEthers();
  const balance = useFundBalance();
  const account = useMemo(
    () =>
      address && balance
        ? {
            address: address!,
            balance: balance!,
          }
        : undefined,
    [address, balance]
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
