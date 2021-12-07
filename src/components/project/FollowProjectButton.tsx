import React from "react";
import { IconButton } from "@chakra-ui/button";
import { StarIcon } from "@chakra-ui/icons";
import useProjectFollow from "hooks/useProjectFollow";

export interface FollowProjectButtonProps {
  address: string;
  slug: string;
}

const FollowProjectButton: React.FC<FollowProjectButtonProps> = ({
  address,
  slug,
}) => {
  const { isLoaded, isFollowed, toggleFollow, isLoading } = useProjectFollow(
    address,
    slug
  );

  return (
    <IconButton
      aria-label="Follow"
      icon={<StarIcon />}
      colorScheme={isFollowed ? "brand" : undefined}
      isDisabled={!isLoaded}
      isLoading={isLoading}
      onClick={() => toggleFollow()}
    />
  );
};

export default FollowProjectButton;
