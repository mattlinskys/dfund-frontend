import { useContractCall, useContractCalls, useEthers } from "@usedapp/core";
import { factory, project } from "app/abis";
import { constants } from "ethers";
import { useMemo } from "react";
import { Project } from "types/project";
import { getCustomKeyCallArgs } from "utils/contractsUtils";
import { bytes32ToString, stringToBytes32 } from "utils/ethersUtils";

const useProject = (
  slug?: string
): { project: Project | undefined; notFound: boolean } => {
  const { account } = useEthers();
  const [address] =
    useContractCall(
      account &&
        slug && {
          abi: factory,
          address: process.env.REACT_APP_FACTORY_ADDRESS,
          method: "projects",
          args: [stringToBytes32(slug)],
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
      {
        abi: project,
        address,
        method: "followerCount",
        args: [],
      },
    ],
    [address]
  );

  const [name, description, avatarUri, bannerUri, followerCount] = (
    (useContractCalls(
      address && address !== constants.AddressZero ? contractCalls : []
    ) ?? []) as (undefined[] | any[])[]
  ).flat();
  const notFound = address === constants.AddressZero;

  return {
    project:
      address && slug && name
        ? {
            address,
            slug,
            name: bytes32ToString(name),
            description,
            avatarUri,
            bannerUri,
            followerCount,
          }
        : undefined,
    notFound,
  };
};

export default useProject;
