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
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { HStack, Text } from "@chakra-ui/layout";
import { FormattedMessage } from "react-intl";
import { Profile } from "types/profile";

export interface ProfileDialogProps {
  isOpen: boolean;
  profile?: Profile;
  onLogOut: () => void;
  onEdit: () => void;
  onClose: () => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({
  isOpen,
  profile,
  onLogOut,
  onEdit,
  onClose,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <FormattedMessage id="profile.title" />
      </ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <HStack spacing={3}>
          <Avatar name={profile?.name} src={profile?.avatarUri} />
          <Text>{profile?.name}</Text>
        </HStack>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onLogOut}>
          <FormattedMessage id="common.logOut" />
        </Button>
        <Button ml={2} onClick={onEdit}>
          <FormattedMessage id="common.edit" />
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ProfileDialog;
