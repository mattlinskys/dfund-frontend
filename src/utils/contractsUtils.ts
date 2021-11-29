import type { Interface } from "@ethersproject/abi";
import type { ContractCall } from "@usedapp/core";

export const getCustomKeyCallArgs = (
  abi: Interface,
  address: string,
  key: string
): ContractCall => ({
  abi,
  address,
  method: "customKeys",
  args: [key],
});
