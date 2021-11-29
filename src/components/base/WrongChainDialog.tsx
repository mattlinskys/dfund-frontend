import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { VStack, Box, Text, Divider } from "@chakra-ui/react";
import { Chain } from "types/chain";
import { FormattedMessage } from "react-intl";

export interface WrongChainDialogProps {
  isOpen: boolean;
  chain: Chain;
  onAddRequest: () => void;
}

const WrongChainDialog: React.FC<WrongChainDialogProps> = ({
  isOpen,
  chain,
  onAddRequest,
}) => (
  <Modal isOpen={isOpen} onClose={() => {}} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <FormattedMessage id="wrongChain.title" />
      </ModalHeader>

      <ModalBody>
        <Text color="gray.600" mb={4}>
          <FormattedMessage
            id="wrongChain.description"
            values={{ name: chain.name }}
          />
        </Text>

        <VStack
          divider={<Divider />}
          p={3}
          border="1px"
          borderColor="gray.200"
          borderRadius="lg"
          align="stretch"
        >
          <Box>
            <Text fontWeight="bold" fontSize="sm" mb={1}>
              <FormattedMessage id="wrongChain.id" />
            </Text>
            <Text>{chain.id}</Text>
          </Box>

          <Box>
            <Text fontWeight="bold" fontSize="sm" mb={1}>
              <FormattedMessage id="wrongChain.name" />
            </Text>
            <Text>{chain.name}</Text>
          </Box>
        </VStack>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onAddRequest}>
          <FormattedMessage id="wrongChain.addRequest" />
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default WrongChainDialog;
