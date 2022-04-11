import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { ShopContext } from "../../context/shopContext";
import { NextPage } from "next";
import {
  Box,
  Grid,
  Heading,
  Image,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";

const Product: NextPage = () => {
  const router = useRouter();
  const { pHandle } = router.query;
  const { fetchProductByHandle, addItemtoCheckout, product } =
    useContext(ShopContext);

  useEffect(() => {
    fetchProductByHandle(pHandle as string);
  }, [fetchProductByHandle, pHandle]);

  return (
    <React.Fragment>
      {product && (
        <Box>
          <Grid templateColumns='repeat(2,1fr)'>
            <Image alt={product.title} src={product.images[0].src} />
            <Box>
              <Heading>{product.title}</Heading>
              <Text>{product.variants[0].price}</Text>
              <Text>{product.description}</Text>
              <Button
                colorScheme='twitter'
                onClick={() => {
                  addItemtoCheckout(product.variants[0].id, 1);
                }}
              >
                Add To Cart
              </Button>
            </Box>
          </Grid>
        </Box>
      )}
    </React.Fragment>
  );
};

export default Product;
