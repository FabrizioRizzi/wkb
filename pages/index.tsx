import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();

  return status !== "loading" ? (
    <Box>
      Home page
    </Box>
  ) : (
    <div>Loading</div>
  );
};

export default Home;
