import React, { useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import { useToast } from "@chakra-ui/react";
import { useIntl } from "react-intl";

const WalletErrorProvider: React.FC = () => {
  const { error } = useEthers();
  const { formatMessage } = useIntl();
  const toast = useToast({
    status: "error",
    duration: 7500,
    isClosable: true,
    variant: "solid",
    position: "bottom",
  });

  useEffect(() => {
    if (error instanceof NoEthereumProviderError) {
      toast({
        title: formatMessage({ id: "errors.wallet.noProvider" }),
      });
    }
  }, [error]);

  return null;
};

export default WalletErrorProvider;
