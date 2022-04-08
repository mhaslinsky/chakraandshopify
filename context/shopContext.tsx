import React, { useCallback, useEffect, useState } from "react";
import Client from "shopify-buy";

type ShopContextObj = {
  product: Client.Product | undefined;
  products: Client.Product[] | [];
  checkout: Client.Cart | undefined;
  isCartOpen: boolean;
  isMenuOpen: boolean;
  fetchAllProducts: () => void;
  fetchProductByHandle: (handle: string) => void;
  addItemtoCheckout: () => void;
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
  addItemtoCheckout: () => {},
  removeLineItem: () => {},
  closeCart: () => {},
  openCart: () => {},
  closeMenu: () => {},
  openMenu: () => {},
});

const ShopContextProvider: React.FC<{ children: any }> = (props) => {
  const [products, setProuducts] = useState<Client.Product[]>([]);
  const [product, setProuduct] = useState<Client.Product>();
  const [checkout, setCheckout] = useState<Client.Cart>();

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

  const addItemtoCheckout = async () => {};

  const removeLineItem = async () => {};

  const fetchAllProducts = useCallback(async () => {
    const products = await client.product.fetchAll();
    setProuducts(products);
  }, []);

  const fetchProductByHandle = useCallback(async (handle: string) => {
    const product = await client.product.fetchByHandle(handle);
    setProuduct(product);
  }, []);

  const closeCart = () => {};
  const openCart = () => {};
  const closeMenu = () => {};
  const openMenu = () => {};

  const contextValue: ShopContextObj = {
    product,
    products,
    checkout,
    isCartOpen: false,
    isMenuOpen: false,
    fetchAllProducts: fetchAllProducts,
    fetchProductByHandle: fetchProductByHandle,
    addItemtoCheckout: addItemtoCheckout,
    removeLineItem: removeLineItem,
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
