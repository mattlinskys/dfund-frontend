import React from "react";
import { Link } from "react-router-dom";
import { getProjectPath } from "utils/routesUtils";

const Home: React.FC = () => {
  return (
    <>
      Hello DFund
      <Link to={"#wallet"}>Wallet</Link>
      <Link to={"#profile"}>Profile</Link>
      <Link to={getProjectPath("example-project")}>Project</Link>
    </>
  );
};

export default Home;
