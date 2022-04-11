import React, { useContext } from "react";
import { Flex, Icon, Image } from "@chakra-ui/react";
import { ShopContext } from "../context/shopContext";
import { MdMenu, MdShoppingBasket } from "react-icons/md";
import Link from "next/link";

const Navbar = () => {
  const { openCart, openMenu, checkout } = useContext(ShopContext);
  return (
    <Flex
      alignItems='center'
      backgroundColor='#09A6F3'
      flexDir='row'
      justifyContent='space-between'
      padding='1rem'
      height='12rem'
    >
      <Icon cursor='pointer' w={30} h={30} fill='white' as={MdMenu}>
        Menu
      </Icon>
      <Flex maxH='100%'>
        <Link passHref href='/'>
          <Image
            objectFit='scale-down'
            cursor='pointer'
            alt='logo'
            src='/logo.png'
          />
        </Link>
      </Flex>
      <Icon
        onClick={openCart}
        cursor='pointer'
        w={30}
        h={30}
        fill='white'
        as={MdShoppingBasket}
      >
        Cart
      </Icon>
    </Flex>
  );
};

export default Navbar;
