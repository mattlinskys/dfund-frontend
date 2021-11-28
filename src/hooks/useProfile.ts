import { useContractCall, useContractCalls, useEthers } from "@usedapp/core";
import { AddressZero } from "@ethersproject/constants";
import { factory, profile } from "app/abis";
import { Profile } from "types/profile";

const useProfile: () => Profile | undefined = () => {
  const { account } = useEthers();
  const [address] =
    useContractCall(
      account && {
        abi: factory,
        address: process.env.REACT_APP_FACTORY_ADDRESS,
        method: "profiles",
        args: [account],
      }
    ) ?? [];

  const [nameRes, avatarUriRes] = (useContractCalls(
    address && address !== AddressZero
      ? [
          {
            abi: profile,
            address,
            method: "name",
            args: [],
          },
          {
            abi: profile,
            address,
            method: "avatarUri",
            args: [],
          },
        ]
      : []
  ) ?? []) as (undefined[] | string[])[];

  const [name] = nameRes ?? [];
  const [avatarUri] = avatarUriRes ?? [];

  return name ? { name, ...(avatarUri ? { avatarUri } : {}) } : undefined;
};

export default useProfile;
