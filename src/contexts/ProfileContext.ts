import { createContext } from "react";
import { Profile } from "types/profile";

export interface ProfileContextValue {
  profile?: Profile;
  hasProfile: boolean;
  isLoaded: boolean;
  setContractAddress: (address: string) => void;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined
);

export default ProfileContext;
