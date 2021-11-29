import React from "react";
import { useParams } from "react-router-dom";
import useProject from "hooks/useProject";
import PostList from "components/project/PostList";

const Project: React.FC = () => {
  const { slug } = useParams() as { slug: string };
  const project = useProject(slug);

  return (
    <>
      Project: {project?.slug} <br />
      Name: {project?.name} <br />
      Description: {project?.description || "-"} <br />
      <PostList slug={slug} />
    </>
  );
};

export default Project;
