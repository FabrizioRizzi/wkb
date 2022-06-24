import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Box, Button, Flex } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import AddDocumentModal from "./addDocumentModal";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <Flex padding={2} bg="purple.700" justify="space-between" align="center">
      <Link href="/">
        <Box color="gray.200" cursor="pointer">
          web-knowledge-base
        </Box>
      </Link>
      {status === "authenticated" && session ? (
        <Flex gap={2} alignItems="center">
          <AddDocumentModal />
          <Box cursor="pointer">
            <Link href="/settings">
              <FiSettings color="white" size={24} />
            </Link>
          </Box>
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
