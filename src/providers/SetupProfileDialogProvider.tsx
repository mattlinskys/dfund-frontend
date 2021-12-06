import React, { useCallback, useContext, useEffect, useMemo } from "react";
import ProfileContext from "contexts/ProfileContext";
import { SETUP_PROFILE_HASH } from "constants/hashes";
import useHashDisclosure from "hooks/useHashDisclosure";
import SetupProfileDialog, {
  SetupProfileDialogProps,
} from "components/profile/SetupProfileDialog";
import { Contract, utils } from "ethers";
import { factory } from "app/abis";
import { useContractFunction } from "@usedapp/core";
import { stringToBytes32 } from "utils/ethersUtils";
import useContractFunctionErrorToast from "hooks/useContractFunctionErrorToast";

const SetupProfileDialogProvider: React.FC = () => {
  const { hasProfile, isLoaded, setContractAddress } =
    useContext(ProfileContext)!;
  const { isVisible, onClose } = useHashDisclosure(
    SETUP_PROFILE_HASH,
    isLoaded && !hasProfile
  );

  const factoryContract = useMemo(
    () => new Contract(process.env.REACT_APP_FACTORY_ADDRESS, factory),
    []
  );
  const { state, send, events } = useContractFunction(
    factoryContract,
    "createProfile"
  );
  useContractFunctionErrorToast(state);

  const handleSubmit = useCallback<SetupProfileDialogProps["onSubmit"]>(
    async (values) => {
      try {
        const customKeys = (
          ["avatarUri", "description"] as (keyof typeof values)[]
        ).filter((key) => !!values[key].trim());

        await send(
          stringToBytes32(values.name),
          customKeys.map((key) => utils.keccak256(utils.toUtf8Bytes(key))),
          customKeys.map((key) => values[key])
        );
      } catch (err) {
        console.error(err);
      }
    },
    [send]
  );

  useEffect(() => {
    const [event] = events ?? [];
    if (state.status === "Success" && event) {
      setContractAddress(event.args.account);
    }
  }, [state.status, events?.length]);

  // const isSubmitting =
  //   state.status === "None" ||
  //   (state.status === "Success" && (!events || events.length === 0));

  return (
    <SetupProfileDialog
      isOpen={isVisible}
      onClose={onClose}
      onSubmit={handleSubmit}
      // isSubmitting={isSubmitting}
    />
  );
};

export default SetupProfileDialogProvider;
