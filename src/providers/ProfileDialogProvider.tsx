import React, { useContext, useEffect } from "react";
import ProfileContext from "contexts/ProfileContext";
import { useEthers } from "@usedapp/core";
import { PROFILE_HASH } from "constants/hashes";
import ProfileDialog from "components/profile/ProfileDialog";
import useHashDisclosure from "hooks/useHashDisclosure";
import EditProfileDialog from "components/profile/EditProfileDialog";
import { useDisclosure } from "@chakra-ui/hooks";

const ProfileDialogProvider: React.FC = () => {
  const { deactivate } = useEthers();
  const { profile } = useContext(ProfileContext)!;
  const { isVisible, onClose } = useHashDisclosure(PROFILE_HASH, !!profile);
  const {
    isOpen: isEditingActive,
    onOpen: onOpenEditing,
    onClose: onCloseEditing,
  } = useDisclosure();

  useEffect(() => {
    if (!isVisible && isEditingActive) {
      onCloseEditing();
    }
  }, [isVisible]);

  return (
    <>
      <ProfileDialog
        isOpen={isVisible}
        profile={profile}
        onClose={onClose}
        onEdit={onOpenEditing}
        onLogOut={deactivate}
      />

      <EditProfileDialog
        isOpen={isVisible && isEditingActive}
        profile={profile!}
        onClose={onCloseEditing}
        onSubmit={async () => {}}
      />
    </>
  );
};

export default ProfileDialogProvider;
