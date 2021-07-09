import Modal from "components/modal";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Header from "./header";


// @ts-ignore
const Layout = (props )=> {

  return (
    <div className="h-screen lg:overflow-y-hidden font-monst">
      <Head>
        <title>Token swap</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Modal />
      <div>
        <Header />
        {props.children}
      </div>
    </div>
  );
};
export default Layout;
