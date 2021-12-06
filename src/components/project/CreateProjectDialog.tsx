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
import EditProjectForm, {
  EditProjectFormProps,
} from "components/project/EditProjectForm";

export interface CreateProjectDialogProps
  extends Pick<EditProjectFormProps, "onSubmit"> {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} size="3xl">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <FormattedMessage id="project.create.title" />
      </ModalHeader>
      <ModalCloseButton />

      <ModalBody pb={4}>
        <EditProjectForm onSubmit={onSubmit} />
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default CreateProjectDialog;
