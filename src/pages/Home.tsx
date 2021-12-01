import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { getProjectPath } from "utils/routesUtils";
import { VStack, Text, Button } from "@chakra-ui/react";
import ProfileContext from "contexts/ProfileContext";
import useNavigateHash from "hooks/useNavigateHash";
import { PROFILE_HASH, SETUP_PROFILE_HASH } from "constants/hashes";

const Home: React.FC = () => {
  const { profile, hasProfile, isLoaded } = useContext(ProfileContext)!;
  const navigateHash = useNavigateHash();

  return (
    <VStack p={4} align="start" spacing={4}>
      <Text>Hello DFund</Text>
      <Link to={"#wallet"}>Wallet</Link>
      <Link to={getProjectPath("example-project")}>Project</Link>
      {isLoaded &&
        (hasProfile ? (
          <Button
            isDisabled={!profile}
            onClick={() => navigateHash(PROFILE_HASH)}
          >
            Show profile
          </Button>
        ) : (
          <Button onClick={() => navigateHash(SETUP_PROFILE_HASH)}>
            Setup profile
          </Button>
        ))}
    </VStack>
  );
};

export default Home;
