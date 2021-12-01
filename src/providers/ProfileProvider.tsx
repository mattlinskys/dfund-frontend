import React, { useEffect, useMemo, useState } from "react";
import ProfileContext, { ProfileContextValue } from "contexts/ProfileContext";
import { useEthers, useContractCall, useContractCalls } from "@usedapp/core";
import { factory, profile as profileAbi } from "app/abis";
import { getCustomKeyCallArgs } from "utils/contractsUtils";
import { constants, utils } from "ethers";

const ProfileProvider: React.FC = ({ children }) => {
  const { account } = useEthers();
  const [contractAddress, setContractAddress] = useState<string | undefined>();
  const [profileAddress] =
    useContractCall(
      account && {
        abi: factory,
        address: process.env.REACT_APP_FACTORY_ADDRESS,
        method: "profiles",
        args: [account],
      }
    ) ?? [];

  useEffect(() => {
    setContractAddress(profileAddress);
  }, [profileAddress]);

  const [nameRes, avatarUriRes, descriptionRes] = (useContractCalls(
    contractAddress && contractAddress !== constants.AddressZero
      ? [
          {
            abi: profileAbi,
            address: contractAddress,
            method: "name",
            args: [],
          },
          getCustomKeyCallArgs(contractAddress, "avatarUri"),
          getCustomKeyCallArgs(contractAddress, "description"),
        ]
      : []
  ) ?? []) as (undefined[] | string[])[];

  const [name] = nameRes ?? [];
  const [avatarUri] = avatarUriRes ?? [];
  const [description] = descriptionRes ?? [];

  const profile = useMemo(
    () =>
      name !== undefined
        ? { name: utils.toUtf8String(name), avatarUri, description }
        : undefined,
    [name, avatarUri, description]
  );
  const hasProfile =
    !!contractAddress && contractAddress !== constants.AddressZero;
  const isLoaded = contractAddress !== undefined;

  const value = useMemo(
    () =>
      ({
        profile,
        hasProfile,
        isLoaded,
        setContractAddress,
      } as ProfileContextValue),
    [profile, hasProfile, isLoaded]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
