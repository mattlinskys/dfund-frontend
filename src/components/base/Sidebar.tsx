import React from "react";
import { Box, Text } from "@chakra-ui/layout";

const Sidebar: React.FC = () => {
  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      w="64"
      h="full"
      backgroundColor="white"
      boxShadow="md"
      display={{ base: "none", md: "flex" }}
      flexDir="column"
    >
      <Text fontSize="3xl" fontWeight="semibold" my="4" textAlign="center">
        Logo
      </Text>

      <Box as="nav">Nav</Box>

      <Box mt="auto">Actions</Box>
    </Box>
  );
};

export default Sidebar;
