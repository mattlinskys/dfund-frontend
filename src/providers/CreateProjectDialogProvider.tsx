import React, { useCallback, useContext, useEffect, useMemo } from "react";
import ProfileContext from "contexts/ProfileContext";
import { CREATE_PROJECT_HASH } from "constants/hashes";
import useHashDisclosure from "hooks/useHashDisclosure";
import CreateProjectDialog, {
  CreateProjectDialogProps,
} from "components/project/CreateProjectDialog";
import { Contract } from "ethers";
import { factory } from "app/abis";
import { useContractFunction } from "@usedapp/core";
import { bytes32ToString, stringToBytes32 } from "utils/ethersUtils";
import useContractFunctionErrorToast from "hooks/useContractFunctionErrorToast";
import { useNavigate } from "react-router";
import { getProjectPath } from "utils/routesUtils";

const CreateProjectDialogProvider: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(ProfileContext)!;
  const { isVisible, onClose } = useHashDisclosure(
    CREATE_PROJECT_HASH,
    isAuthenticated
  );
  const factoryContract = useMemo(
    () => new Contract(process.env.REACT_APP_FACTORY_ADDRESS, factory),
    []
  );
  const { state, send, events } = useContractFunction(
    factoryContract,
    "createProject"
  );
  useContractFunctionErrorToast(state);

  const handleSubmit = useCallback<CreateProjectDialogProps["onSubmit"]>(
    async (values) => {
      try {
        await send(stringToBytes32(values.slug), stringToBytes32(values.name));
      } catch (err) {
        console.error(err);
      }
    },
    [send]
  );

  useEffect(() => {
    const [event] = events ?? [];
    if (state.status === "Success" && event) {
      navigate(getProjectPath(bytes32ToString(event.args.slug)));
    }
  }, [state.status, events?.length]);

  return (
    <CreateProjectDialog
      isOpen={isVisible}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateProjectDialogProvider;
