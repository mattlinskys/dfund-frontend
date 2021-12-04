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
import { Profile } from "types/profile";

export interface EditProfileDialogProps
  extends Pick<EditProfileFormProps, "onSubmit"> {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  profile,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <FormattedMessage id="profile.edit.title" />
      </ModalHeader>
      <ModalCloseButton />

      <ModalBody pb={4}>
        <EditProfileForm defaultValues={profile} onSubmit={onSubmit} />
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default EditProfileDialog;
