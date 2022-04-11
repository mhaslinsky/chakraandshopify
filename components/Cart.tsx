import React, { useContext } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Grid,
  Image,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { ShopContext } from "../context/shopContext";
import { IoMdTrash } from "react-icons/io";

const Cart = () => {
  const { isCartOpen, closeCart, checkout, removeLineItem } =
    useContext(ShopContext);

  console.log(checkout);
  return (
    <Drawer p={1} isOpen={isCartOpen} placement='right' onClose={closeCart}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Cart</DrawerHeader>
        <DrawerBody>
          {checkout?.lineItems &&
            checkout.lineItems.map((item: any) => (
              <Grid templateColumns='repeat(4,1fr)' gap={1} key={item.id}>
                <Flex alignItems='center'>
                  <Image
                    borderRadius='100%'
                    objectFit='scale-down'
                    alt={item.title}
                    src={item.variant.image.src}
                  />
                </Flex>
                <Flex alignItems='center'>
                  <Text>{item.title}</Text>
                </Flex>
                <Flex alignItems='center'>
                  <Text>${item.variant.price}</Text>
                </Flex>
                <Flex alignItems='center'>
                  <Icon boxSize='3rem' as={IoMdTrash}></Icon>
                </Flex>
              </Grid>
            ))}
        </DrawerBody>
        <DrawerFooter>
          <Button
            colorScheme='twitter'
            variant='outline'
            mr={3}
            onClick={closeCart}
          >
            Checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
