import type { ContractCall } from "@usedapp/core";
import { customizable } from "app/abis";
import { utils } from "ethers";

export const getCustomKeyCallArgs = (
  address: string,
  key: string
): ContractCall => ({
  abi: customizable,
  address,
  method: "customKeys",
  args: [utils.keccak256(utils.toUtf8Bytes(key))],
});
