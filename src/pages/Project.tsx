import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProject from "hooks/useProject";
import ProjectContext, { ProjectContextValue } from "contexts/ProjectContext";
import PostList from "components/project/PostList";
import Banner from "components/project/Banner";
import {
  Box,
  SkeletonCircle,
  Image,
  useToast,
  HStack,
  Text,
  Heading,
  VStack,
  Tag,
  Button,
} from "@chakra-ui/react";
import { HOME_PATH } from "constants/routes";
import { FormattedMessage, useIntl } from "react-intl";
import FollowProjectButton from "components/project/FollowProjectButton";
import TogglableText from "components/common/TogglableText";
import { utils } from "ethers";

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
        <HStack spacing="4">
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
          <Heading as="h1">{project?.name}</Heading>
          {project && (
            <FollowProjectButton
              address={project.address}
              slug={project.slug}
            />
          )}
        </HStack>

        <HStack mt="6" spacing="6" align="start">
          <VStack
            bg="white"
            shadow="md"
            rounded="md"
            w="sm"
            padding="4"
            flexShrink="0"
            spacing="3"
            alignItems="start"
          >
            <VStack spacing="1.5" alignItems="start">
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                <FormattedMessage id="common.description" />
              </Text>

              <Box>
                <TogglableText noOfLines={3}>
                  {project?.description || "-"}
                </TogglableText>
              </Box>
            </VStack>

            <VStack spacing="1.5" alignItems="start">
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                <FormattedMessage id="common.tags" />
              </Text>

              {(project?.tags.length || 0) > 0 ? (
                <Box display="flex" flexWrap="wrap">
                  {project!.tags.map((tag) => (
                    <Tag mr="2" mt="2" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </Box>
              ) : (
                <Text>-</Text>
              )}
            </VStack>

            <VStack w="full" spacing="1.5" alignItems="start">
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                <FormattedMessage id="common.balance" />
              </Text>

              <HStack w="full" justifyContent="space-between">
                <Text>
                  {project?.balance ? utils.formatEther(project.balance) : "-"}
                </Text>
                <Button size="sm">
                  <FormattedMessage id="common.support" />
                </Button>
              </HStack>
            </VStack>
          </VStack>

          <Box bg="white" shadow="md" rounded="md" h="xl" flexGrow="1">
            <PostList slug={slug} />
          </Box>
        </HStack>
      </Box>
    </ProjectContext.Provider>
  );
};

export default Project;
