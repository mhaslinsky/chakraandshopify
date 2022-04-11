import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { Box, Grid, Text, Image } from "@chakra-ui/react";
import classes from "./Index.module.scss";

const Home: NextPage = () => {
  const { fetchAllProducts, products } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <React.Fragment>
      <Head>
        <title>Chakra Store</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {products ? (
        <Box>
          <Grid templateColumns='repeat(3, 1fr)'>
            {products.map((p) => {
              return (
                <Box key={p.id}>
                  <Link passHref key={p.id} href={`/products/${p.handle}`}>
                    <Box
                      cursor='pointer'
                      _hover={{ opacity: "80%" }}
                      textAlign='center'
                    >
                      <Image alt={p.title} src={p.images[0].src} />
                      <Text>{p.title}</Text>
                      <Text>${p.variants[0].price}</Text>
                    </Box>
                  </Link>
                </Box>
              );
            })}
          </Grid>
        </Box>
      ) : (
        <p>Loading...</p>
      )}
    </React.Fragment>
  );
};

export default Home;
