import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { HStack, Text } from "@chakra-ui/layout";
import { FormattedMessage } from "react-intl";
import { Box, IconButton, Tooltip, VStack } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { FUND_TOKEN_SYMBOL } from "constants/symbols";
import copy from "copy-to-clipboard";
import type { BigNumber } from "@ethersproject/bignumber";

export interface WalletDialogProps {
  isOpen: boolean;
  account?: {
    address: string;
    balance: BigNumber;
  };
  onDisconnect: () => void;
  onClose: () => void;
}

const WalletDialog: React.FC<WalletDialogProps> = ({
  isOpen,
  account,
  onDisconnect,
  onClose,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <FormattedMessage id="wallet.title" />
      </ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Box p={4} border="1px" borderColor="gray.200" borderRadius="xl">
          <VStack spacing="2" align="left" textAlign="left">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.500">
                <FormattedMessage id="common.address" />
              </Text>
              <HStack justify="space-between">
                <Text isTruncated>{account?.address}</Text>
                <Tooltip
                  hasArrow
                  label={<FormattedMessage id="common.copy" />}
                  borderRadius="full"
                  arrowSize={8}
                  placement="top"
                >
                  <IconButton
                    aria-label="Copy"
                    variant="link"
                    borderRadius="full"
                    onClick={() => copy(account!.address)}
                    minWidth="0"
                    p={1}
                  >
                    <CopyIcon />
                  </IconButton>
                </Tooltip>
              </HStack>
            </Box>

            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.500">
                <FormattedMessage id="common.balance" />
              </Text>
              <Text color="gray.500">
                {account?.balance.toString()} {FUND_TOKEN_SYMBOL}
              </Text>
            </Box>
          </VStack>
        </Box>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onDisconnect}>
          <FormattedMessage id="common.disconnect" />
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default WalletDialog;
