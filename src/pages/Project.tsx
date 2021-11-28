import React from "react";
import { useParams } from "react-router-dom";

const Project: React.FC = () => {
  const { slug } = useParams();

  return <>Project DFund {slug}</>;
};

export default Project;
