import React from "react";
import { Box } from "@chakra-ui/layout";

const Main: React.FC = ({ children }) => (
  <Box as="main" pl={{ md: "60" }}>
    {children}
  </Box>
);

export default Main;
