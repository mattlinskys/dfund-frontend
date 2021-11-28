import { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import useHashValue from "hooks/useHashValue";
import useNavigateHash from "hooks/useNavigateHash";

const useHashDisclosure = (disclosureHash: string, show: boolean) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isVisible = isOpen && show;
  const hash = useHashValue();
  const navigateHash = useNavigateHash();

  useEffect(() => {
    if (hash === disclosureHash) {
      onOpen();
    } else {
      onClose();
    }
  }, [hash]);

  useEffect(() => {
    if (!isVisible && hash) {
      navigateHash();
    }
  }, [isVisible]);

  return { isVisible, onClose };
};

export default useHashDisclosure;
