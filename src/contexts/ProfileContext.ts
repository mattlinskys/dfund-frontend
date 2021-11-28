import { createContext } from "react";
import { Profile } from "types/profile";

export interface ProfileContextValue {
  profile?: Profile;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined
);

export default ProfileContext;
