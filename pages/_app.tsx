import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </SessionProvider>
);

export default MyApp;
