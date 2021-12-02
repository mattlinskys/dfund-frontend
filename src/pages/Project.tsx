import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import useProject from "hooks/useProject";
import ProjectContext, { ProjectContextValue } from "contexts/ProjectContext";
import PostList from "components/project/PostList";
import Banner from "components/project/Banner";
import { Box, SkeletonCircle, Image } from "@chakra-ui/react";

const Project: React.FC = () => {
  const { slug } = useParams() as { slug: string };
  const project = useProject(slug);
  const isBannerVisible = !project || !!project.bannerUri;

  const providerValue = useMemo(
    () =>
      ({
        project,
      } as ProjectContextValue),
    [project]
  );

  return (
    <ProjectContext.Provider value={providerValue}>
      {isBannerVisible && <Banner bannerUri={project?.bannerUri} />}
      <Box
        px="4"
        boxSizing="content-box"
        mx="auto"
        maxW="container.xl"
        mt={isBannerVisible ? "-8" : "8"}
        mb="8"
      >
        <Box
          rounded="full"
          display="inline-block"
          w="40"
          height="40"
          bg="white"
          outline="6px solid white"
          pos="relative"
          zIndex="2"
        >
          <SkeletonCircle size="full" isLoaded={!!project?.avatarUri}>
            {project?.avatarUri && (
              <Image
                borderRadius="full"
                boxSize="full"
                fit="cover"
                align="center"
                src={project.avatarUri}
                alt="Project's avatar"
              />
            )}
          </SkeletonCircle>
        </Box>
        Project: {project?.slug} <br />
        Name: {project?.name} <br />
        Description: {project?.description || "-"} <br />
        <PostList slug={slug} />
      </Box>
    </ProjectContext.Provider>
  );
};

export default Project;
