import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";

const About = () => {
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
      <h1 className="p-4 text-center showcase mp-4">About Us</h1>
      <div className="container p-4 mp-4">
        <body>
          You can learn from the experience and wisdom of those who have gone
          before you, as well as teach those who are just starting out!
          <h5 className="text-center">Coming soon...</h5>
          <h4 className="text-center">Iron Will Academy</h4>
        </body>
      </div>
    </>
  );
};

export default About;
