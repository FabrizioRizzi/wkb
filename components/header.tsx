import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import getTags from "../pages/api/tags";

const Header = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    const vai = async () => {
      const tags = await fetch('http://localhost:3000/api/tags');
      if (tags.status == 200) {
        const res = await tags.json();
        console.log(res);
      }
    }
    vai();
  }, [])
    
  return (
    <Flex padding={2} bg="purple.700" justify="space-between" align="center">
      <Box>wkb</Box>
      {status === "authenticated" && session ? (
        <Flex gap={2}>
          <Box>
            <Button onClick={() => signOut()}>Sign out</Button>
          </Box>
          <Box
            borderRadius="100%"
            boxSize={10}
            position="relative"
            overflow="hidden"
          >
            <Image
              src={session.user.image}
              alt="User Profile Pic"
              layout="fill"
            />
          </Box>
        </Flex>
      ) : (
        <Box>
          <Button onClick={() => signIn("github")}>Sign in</Button>
        </Box>
      )}
    </Flex>
  );
};

export default Header;