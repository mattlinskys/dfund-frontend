import React from "react";
import { Link } from "react-router-dom";
import { getProjectPath } from "utils/routesUtils";
import { VStack, Text } from "@chakra-ui/react";

const Home: React.FC = () => {
  return (
    <VStack p={4} align="start" spacing={4}>
      <Text>Hello DFund</Text>
      <Link to={"#wallet"}>Wallet</Link>
      <Link to={getProjectPath("example-project")}>Example Project</Link>
    </VStack>
  );
};

export default Home;
