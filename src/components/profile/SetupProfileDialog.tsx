import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { FormattedMessage } from "react-intl";
import EditProfileForm, {
  EditProfileFormProps,
} from "components/profile/EditProfileForm";

export interface SetupProfileDialogProps
  extends Pick<EditProfileFormProps, "onSubmit"> {
  isOpen: boolean;
  onClose: () => void;
}

const SetupProfileDialog: React.FC<SetupProfileDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <FormattedMessage id="profile.setup.title" />
      </ModalHeader>
      <ModalCloseButton />

      <ModalBody pb={4}>
        <EditProfileForm onSubmit={onSubmit} />
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default SetupProfileDialog;
