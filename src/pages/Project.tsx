import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProject from "hooks/useProject";
import ProjectContext, { ProjectContextValue } from "contexts/ProjectContext";
import PostList from "components/project/PostList";
import Banner from "components/project/Banner";
import { Box, SkeletonCircle, Image, useToast } from "@chakra-ui/react";
import { HOME_PATH } from "constants/routes";
import { useIntl } from "react-intl";
import FollowProjectButton from "components/project/FollowProjectButton";

const Project: React.FC = () => {
  const { slug } = useParams() as { slug: string };
  const { project, notFound } = useProject(slug);
  const isBannerVisible = !project || !!project.bannerUri;
  const navigate = useNavigate();
  const toast = useToast();
  const { formatMessage } = useIntl();

  const providerValue = useMemo(
    () =>
      ({
        project,
      } as ProjectContextValue),
    [project]
  );

  useEffect(() => {
    if (notFound) {
      navigate(HOME_PATH, { replace: true });
      toast({
        title: formatMessage({ id: "erros.projectNotFound" }),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [notFound]);

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
        Followers count: {project?.followerCount.toString()}
        {project && (
          <FollowProjectButton address={project.address} slug={project.slug} />
        )}
        <PostList slug={slug} />
      </Box>
    </ProjectContext.Provider>
  );
};

export default Project;
