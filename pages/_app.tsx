import { ChakraProvider } from "@chakra-ui/react";
import ShopContextProvider from "../context/shopContext";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ShopContextProvider>
      <ChakraProvider>
        <Navbar />
        <Cart />
        <Component {...pageProps} />
        <footer>Footer</footer>
      </ChakraProvider>
    </ShopContextProvider>
  );
}

export default MyApp;
