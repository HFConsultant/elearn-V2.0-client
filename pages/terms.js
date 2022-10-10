import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";

const Terms = () => {
  const head = () => (
    <Head>
      <title>HFConsultants - A social network for health and fitness</title>
      <meta
        name="description"
        content="A social network by and for health and fitness professionals and enthusiasts"
      />
      <meta
        property="og:description"
        content="A social network by and for health and fitness professionals and enthusiasts"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="HFConsultants" />
      <meta property="og:url" content="http://hfconsultant.com" />
      <meta
        property="og:image:secure_url"
        content="http://hfconsultant.com/images/default.jpg"
      />
    </Head>
  );

  return (
    <>
      {head()}
      <ParallaxBG url="/images/default.jpg" />
      <h1 className="p-4 text-center showcase mp-4">Terms and Conditions</h1>
      <div className="container p-4 mp-4">
        Both parties agree that content is supplied by the user and approved by
        administration.
      </div>
    </>
  );
};

export default Terms;
