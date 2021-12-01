import { useContractCall, useContractCalls, useEthers } from "@usedapp/core";
import { factory, project } from "app/abis";
import { constants } from "ethers";
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

  const [nameRes, descriptionRes] = (useContractCalls(
    address && address !== constants.AddressZero
      ? [
          {
            abi: project,
            address,
            method: "name",
            args: [],
          },
          getCustomKeyCallArgs(address, "description"),
        ]
      : []
  ) ?? []) as (undefined[] | string[])[];

  const [name] = nameRes ?? [];
  const [description] = descriptionRes ?? [];

  return address && slug && name
    ? { address, slug, name, description }
    : undefined;
};

export default useProject;
