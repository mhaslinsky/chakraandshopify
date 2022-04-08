import { ChakraProvider } from "@chakra-ui/react";
import ShopContextProvider from "../context/shopContext";
import "../styles/globals.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ShopContextProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ShopContextProvider>
  );
}

export default MyApp;
