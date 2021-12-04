import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useIntl } from "react-intl";
import type { TransactionStatus } from "@usedapp/core";

const useContractFunctionErrorToast = (state: TransactionStatus) => {
  const toast = useToast();
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (state.status === "Exception" || state.status === "Fail") {
      toast({
        title: state.errorMessage || formatMessage({ id: "erros.default" }),
        status: "error",
        duration: 7500,
        isClosable: true,
      });
    }
  }, [state]);
};

export default useContractFunctionErrorToast;
