import { Box } from "@chakra-ui/react";
import Header from "./header";

const MainLayout = ({ children }) => (
  <Box width="100vw" height="100vh">
    <Box height={14}>
      <Header />
    </Box>
    <Box height="calc(100vh - 100px)">{children}</Box>
  </Box>
);

export default MainLayout;
