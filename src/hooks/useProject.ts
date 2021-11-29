import { useContractCall, useContractCalls, useEthers } from "@usedapp/core";
import { factory, project } from "app/abis";
import { AddressZero } from "@ethersproject/constants";
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
    address && address !== AddressZero
      ? [
          {
            abi: project,
            address,
            method: "name",
            args: [],
          },
          getCustomKeyCallArgs(project, address, "description"),
        ]
      : []
  ) ?? []) as (undefined[] | string[])[];

  const [name] = nameRes ?? [];
  const [description] = descriptionRes ?? [];

  return slug && name ? { slug, name, description } : undefined;
};

export default useProject;
