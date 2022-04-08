import React, { useState } from "react";
import Client from "shopify-buy";

type ShopContextObj = {
  product: Client.Product | null;
  products: Client.Product[];
  checkout: Client.Cart | null;
  isCartOpen: boolean;
  isMenuOpen: boolean;
};

const client = Client.buildClient({
  domain: `${process.env.SHOPIFY_DOMAIN}`,
  storefrontAccessToken: `${process.env.SHOPIFY_API}`,
});

export const ShopContext = React.createContext<ShopContextObj>({
  product: null,
  products: [],
  checkout: null,
  isCartOpen: false,
  isMenuOpen: false,
});

const ShopContextProvider: React.FC<{ children: any }> = (props) => {
  const [products, setProuducts] = useState<any[]>([]);
  const [product, setProuduct] = useState<any>(null);
  const contextValue: ShopContextObj = {
    product,
    products,
    checkout: null,
    isCartOpen: false,
    isMenuOpen: false,
  };

  const createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout-id", checkout.id.toString());
  };
  const fetchCheckout = async () => {};
  const addItemtoCheckout = async () => {};
  const removeLineItem = async () => {};

  const fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    setProuducts(products);
  };

  const fetchProductByHandle = async (handle: string) => {
    const product = await client.product.fetchByHandle(handle);
    setProuduct(product);
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
