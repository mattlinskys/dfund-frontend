import React from "react";
// import React, { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Image } from "@chakra-ui/react";

export interface BannerProps {
  bannerUri?: string;
}

// const outHeight = { base: "24vh", md: 56 };
// const inHeight = { base: "12vh", md: 24 };

const Banner: React.FC<BannerProps> = ({ bannerUri }) => {
  // const [height, setHeight] = useState(outHeight);
  // const ref = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY === 0 && height === inHeight) {
  //       setHeight(outHeight);
  //     } else if (
  //       window.scrollY > ref.current?.clientHeight! / 2 &&
  //       height === outHeight
  //     ) {
  //       setHeight(inHeight);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [height]);

  return (
    <Skeleton rounded="none" isLoaded={!!bannerUri}>
      <Box
        // ref={ref}
        // h={height}
        // transitionProperty="height"
        // transitionDuration="150ms"
        h={{ base: "24vh", md: 56 }}
      >
        {bannerUri && (
          <Image
            boxSize="full"
            fit="cover"
            align="center"
            src={bannerUri}
            alt="Project's banner"
          />
        )}
      </Box>
    </Skeleton>
  );
};

export default Banner;
