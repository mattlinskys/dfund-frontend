import React, { useContext } from "react";
import { Button, Box, HStack, Avatar, Skeleton, Text } from "@chakra-ui/react";
import useNavigateHash from "hooks/useNavigateHash";
import { SETUP_PROFILE_HASH, PROFILE_HASH } from "constants/hashes";
import { useEthers } from "@usedapp/core";
import ProfileContext from "contexts/ProfileContext";
import { FormattedMessage } from "react-intl";

const SidebarUserMenu: React.FC = () => {
  const navigateHash = useNavigateHash();
  const { active, account, activateBrowserWallet } = useEthers();
  const { hasProfile, isLoaded, profile } = useContext(ProfileContext)!;

  return (
    <Box px={active && isLoaded && hasProfile ? 2 : 4}>
      {active ? (
        isLoaded ? (
          hasProfile ? (
            profile ? (
              <HStack
                as="button"
                w="full"
                h={12}
                px={2}
                spacing={2.5}
                rounded="md"
                transition="background-color 150ms ease-out"
                _hover={{ bg: "gray.100" }}
                onClick={() => navigateHash(PROFILE_HASH)}
              >
                <Avatar
                  src={profile!.avatarUri}
                  name={profile!.name}
                  size="sm"
                />

                <Box textAlign="left" overflow="hidden">
                  <Text fontWeight="medium">{profile!.name}</Text>
                  <Text fontSize="sm" isTruncated>
                    {account}
                  </Text>
                </Box>
              </HStack>
            ) : (
              <Skeleton>
                <Box h={12} />
              </Skeleton>
            )
          ) : (
            <Button
              w="full"
              size="lg"
              colorScheme="brand"
              onClick={() => navigateHash(SETUP_PROFILE_HASH)}
            >
              <FormattedMessage id="sidebar.setupProfile" />
            </Button>
          )
        ) : (
          <Skeleton>
            <Box h={12} />
          </Skeleton>
        )
      ) : (
        <Button
          w="full"
          size="lg"
          onClick={() => activateBrowserWallet(undefined, false)}
        >
          <FormattedMessage id="sidebar.connectWallet" />
        </Button>
      )}
    </Box>
  );
};

export default SidebarUserMenu;
