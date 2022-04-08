import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/shopContext";

const Home: NextPage = () => {
  const { fetchAllProducts, products } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <React.Fragment>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>Homepage</main>
      {products ? (
        <div>
          {products.map((p) => {
            return <p key={p.id}>{p.title}</p>;
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </React.Fragment>
  );
};

export default Home;
