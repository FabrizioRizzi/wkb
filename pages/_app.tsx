import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import MainLayout from "../components/mainLayout";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <ChakraProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>{" "}
    </ChakraProvider>
  </SessionProvider>
);

export default MyApp;
