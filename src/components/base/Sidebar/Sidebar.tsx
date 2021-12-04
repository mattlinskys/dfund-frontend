import React from "react";
import SidebarFooter from "components/base/Sidebar/SidebarFooter";
import SidebarUserMenu from "components/base/Sidebar/SidebarUserMenu";
import { Box, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HOME_PATH } from "constants/routes";
import Logo from "components/base/Logo";

const Sidebar: React.FC = () => {
  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      w="60"
      h="full"
      backgroundColor="white"
      boxShadow="md"
      display={{ base: "none", md: "flex" }}
      flexDir="column"
    >
      <Center my="8">
        <Link to={HOME_PATH}>
          <Logo />
        </Link>
      </Center>

      <SidebarUserMenu />

      <Box as="nav"></Box>

      <SidebarFooter />
    </Box>
  );
};

export default Sidebar;
