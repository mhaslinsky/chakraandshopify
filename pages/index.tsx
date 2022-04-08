import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>Hello World!</main>
      <footer></footer>
    </React.Fragment>
  );
};

export default Home;
