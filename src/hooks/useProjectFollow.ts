import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useContractCall, useContractFunction } from "@usedapp/core";
import { factory, profile } from "app/abis";
import ProfileContext from "contexts/ProfileContext";
import { Contract } from "@ethersproject/contracts";
import useContractFunctionErrorToast from "hooks/useContractFunctionErrorToast";
import { stringToBytes32 } from "utils/ethersUtils";

const useProjectFollow = (address: string, slug: string) => {
  const [isLoading, setLoading] = useState(false);
  const [isFollowed, setFollowed] = useState(false);
  const { contractAddress } = useContext(ProfileContext)!;
  const res = useContractCall(
    contractAddress && {
      abi: profile,
      address: contractAddress,
      method: "getFollowedProject",
      args: [address],
    }
  );
  const isLoaded = res !== undefined;
  const factoryContract = useMemo(
    () => new Contract(process.env.REACT_APP_FACTORY_ADDRESS, factory),
    []
  );
  const { state, send } = useContractFunction(
    factoryContract,
    isFollowed ? "unfollowProject" : "followProject"
  );
  useContractFunctionErrorToast(state);

  useEffect(() => {
    if (res) {
      setFollowed(res[0] as boolean);
    }
  }, [res]);

  const toggleFollow = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);
    try {
      await send(stringToBytes32(slug));
      setFollowed(!isFollowed);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, send, slug]);

  return {
    isLoaded,
    isFollowed,
    toggleFollow,
    isLoading,
  };
};

export default useProjectFollow;
