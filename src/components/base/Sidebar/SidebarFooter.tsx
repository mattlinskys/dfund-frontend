import React from "react";
import { Button, VStack } from "@chakra-ui/react";
import useNavigateHash from "hooks/useNavigateHash";
import { CREATE_PROJECT_HASH, SETUP_PROFILE_HASH } from "constants/hashes";

const SidebarFooter: React.FC = () => {
  const navigateHash = useNavigateHash();

  return (
    <VStack mt="auto" p="4" spacing="2">
      <Button
        onClick={() => navigateHash(CREATE_PROJECT_HASH)}
        w="full"
        colorScheme="brand"
        variant="solid"
      >
        Create Project
      </Button>
      <Button
        onClick={() => navigateHash(SETUP_PROFILE_HASH)}
        w="full"
        colorScheme="brand"
        variant="solid"
      >
        Setup Profile
      </Button>
    </VStack>
  );
};

export default SidebarFooter;
