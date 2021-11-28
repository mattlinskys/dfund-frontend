import React, { useMemo } from "react";
import ProfileContext, { ProfileContextValue } from "contexts/ProfileContext";
import useProfile from "hooks/useProfile";

const ProfileProvider: React.FC = ({ children }) => {
  const profile = useProfile();

  const value = useMemo(
    () =>
      ({
        profile,
      } as ProfileContextValue),
    [profile]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
