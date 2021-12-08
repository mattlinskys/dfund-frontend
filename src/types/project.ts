import type { BigNumber } from "ethers";

export interface Project {
  address: string;
  balance?: BigNumber;
  slug: string;
  name: string;
  tags: string[];
  description?: string;
  avatarUri?: string;
  bannerUri?: string;
  followerCount: BigNumber;
}
