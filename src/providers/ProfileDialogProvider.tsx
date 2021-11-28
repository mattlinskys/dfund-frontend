import React, { useContext } from "react";
import ProfileContext from "contexts/ProfileContext";
import { useEthers } from "@usedapp/core";
import { PROFILE_HASH } from "constants/hashes";
import ProfileDialog from "components/profile/ProfileDialog";
import useHashDisclosure from "hooks/useHashDisclosure";

const ProfileDialogProvider: React.FC = () => {
  const { deactivate } = useEthers();
  const { profile } = useContext(ProfileContext)!;
  const { isVisible, onClose } = useHashDisclosure(PROFILE_HASH, !!profile);

  return (
    <ProfileDialog
      isOpen={isVisible}
      profile={profile}
      onClose={onClose}
      onLogOut={deactivate}
    />
  );
};

export default ProfileDialogProvider;
