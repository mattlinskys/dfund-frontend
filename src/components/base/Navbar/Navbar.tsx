import React from "react";
import { Box, HStack } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { HOME_PATH } from "constants/routes";
import Logo from "components/base/Logo";

const Navbar: React.FC = () => {
  return (
    <HStack
      pos="sticky"
      top="0"
      insetX="0"
      h="14"
      px="4"
      backgroundColor="white"
      boxShadow="md"
      display={{ base: "flex", md: "none" }}
    >
      <Box h="8" color="gray.700">
        <Link to={HOME_PATH}>
          <Logo height="100%" width="auto" />
        </Link>
      </Box>

      <Box></Box>
    </HStack>
  );
};

export default Navbar;
