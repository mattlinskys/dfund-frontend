import { useEthers, useTokenBalance } from "@usedapp/core";

const useFundBalance = () => {
  const { account } = useEthers();
  return useTokenBalance(process.env.REACT_APP_TOKEN_ADDRESS, account);
};

export default useFundBalance;
