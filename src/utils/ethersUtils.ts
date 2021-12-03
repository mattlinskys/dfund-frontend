import { utils } from "ethers";

export const stringToBytes32 = (value: string) =>
  utils.hexZeroPad(utils.toUtf8Bytes(value), 32);

export const bytes32ToString = (value: string) =>
  utils.toUtf8String(value).replace(/^(\x00)+/, "");
