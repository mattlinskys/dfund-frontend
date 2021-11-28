import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      Hello DFund
      <Link to={"#wallet"}>Wallet</Link>
      <Link to={"#profile"}>Profile</Link>
      <Link to={"/project/test"}>Project</Link>
    </>
  );
};

export default Home;
