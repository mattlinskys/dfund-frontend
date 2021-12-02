import { useContractCall, useContractCalls, useEthers } from "@usedapp/core";
import { factory, project } from "app/abis";
import { constants } from "ethers";
import { useMemo } from "react";
import { Project } from "types/project";
import { getCustomKeyCallArgs } from "utils/contractsUtils";

const useProject = (slug?: string): Project | undefined => {
  const { account } = useEthers();
  const [address] =
    useContractCall(
      account &&
        slug && {
          abi: factory,
          address: process.env.REACT_APP_FACTORY_ADDRESS,
          method: "projects",
          args: [slug],
        }
    ) ?? [];
  const contractCalls = useMemo(
    () => [
      {
        abi: project,
        address,
        method: "name",
        args: [],
      },
      getCustomKeyCallArgs(address, "description"),
      getCustomKeyCallArgs(address, "avatarUri"),
      getCustomKeyCallArgs(address, "bannerUri"),
    ],
    [address]
  );

  const [name, description, avatarUri, bannerUri] = (
    (useContractCalls(
      address && address !== constants.AddressZero ? contractCalls : []
    ) ?? []) as (undefined[] | string[])[]
  ).flat();

  return address && slug && name
    ? { address, slug, name, description, avatarUri, bannerUri }
    : undefined;
};

export default useProject;
