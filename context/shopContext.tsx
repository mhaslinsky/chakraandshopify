import React, { useCallback, useEffect, useState } from "react";
import Client from "shopify-buy";

//stopped typing as the types package for shopify.buy seems out of date
//Client.Product, Client.Cart were not accurately displaying all properties.
type ShopContextObj = {
  product: any | undefined;
  products: any[] | [];
  checkout: any | undefined;
  isCartOpen: boolean;
  isMenuOpen: boolean;
  fetchAllProducts: () => void;
  fetchProductByHandle: (handle: string) => void;
  addItemtoCheckout: (variantId: string, quantity: number) => void;
  removeLineItem: () => void;
  closeCart: () => void;
  openCart: () => void;
  closeMenu: () => void;
  openMenu: () => void;
};

const client = Client.buildClient({
  domain: `${process.env.SHOPIFY_DOMAIN}`,
  storefrontAccessToken: `${process.env.SHOPIFY_API}`,
});

export const ShopContext = React.createContext<ShopContextObj>({
  product: undefined,
  products: [],
  checkout: undefined,
  isCartOpen: false,
  isMenuOpen: false,
  fetchAllProducts: () => {},
  fetchProductByHandle: (handle: string) => {},
  addItemtoCheckout: (variantId: string, quantity: number) => {},
  removeLineItem: () => {},
  closeCart: () => {},
  openCart: () => {},
  closeMenu: () => {},
  openMenu: () => {},
});
//API methods provided by shopify JS SDK @https://shopify.github.io/js-buy-sdk/
const ShopContextProvider: React.FC<{ children: any }> = (props) => {
  const [isCartOpen, setCartOpen] = useState<boolean>(false);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [products, setProuducts] = useState<any[]>([]);
  const [product, setProuduct] = useState<any>();
  const [checkout, setCheckout] = useState<any>();

  useEffect(() => {
    if (localStorage.checkout_id) {
      fetchCheckout(localStorage.checkout_id);
    } else {
      createCheckout();
    }
  }, []);

  const createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout_id", checkout.id.toString());
    setCheckout(checkout);
  };

  const fetchCheckout = async (checkoutId: string) => {
    const checkout = await client.checkout.fetch(checkoutId);
    setCheckout(checkout);
  };

  const addItemtoCheckout = async (variantId: string, quantity: number) => {
    const lineItemsToAdd = [{ variantId, quantity }];

    const addedItem = await client.checkout.addLineItems(
      checkout!.id,
      lineItemsToAdd
    );

    setCheckout(addedItem);
    setCartOpen(true);
  };

  const removeLineItem = async () => {};

  const fetchAllProducts = useCallback(async () => {
    const products = await client.product.fetchAll();
    setProuducts(products);
  }, []);

  const fetchProductByHandle = useCallback(async (handle: string) => {
    const product = await client.product.fetchByHandle(handle);
    setProuduct(product);
  }, []);

  const closeCart = () => {
    setCartOpen(false);
  };
  const openCart = () => {
    setCartOpen(true);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const openMenu = () => {
    setMenuOpen(true);
  };

  const contextValue: ShopContextObj = {
    product,
    products,
    checkout,
    isCartOpen,
    isMenuOpen,
    fetchAllProducts,
    fetchProductByHandle,
    addItemtoCheckout,
    removeLineItem,
    closeCart: closeCart,
    openCart: openCart,
    closeMenu: closeMenu,
    openMenu: openMenu,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
