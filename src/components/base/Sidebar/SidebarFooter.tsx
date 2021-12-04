import React, { useContext } from "react";
import { Button, VStack } from "@chakra-ui/react";
import useNavigateHash from "hooks/useNavigateHash";
import { CREATE_PROJECT_HASH } from "constants/hashes";
import ProfileContext from "contexts/ProfileContext";

const SidebarFooter: React.FC = () => {
  const navigateHash = useNavigateHash();
  const { hasProfile } = useContext(ProfileContext)!;

  return (
    <VStack mt="auto" p="4" spacing="2">
      {hasProfile && (
        <Button
          onClick={() => navigateHash(CREATE_PROJECT_HASH)}
          w="full"
          colorScheme="brand"
          variant="solid"
        >
          Create Project
        </Button>
      )}
    </VStack>
  );
};

export default SidebarFooter;
