import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";

const Privacy = () => {
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
      <h1 className="p-4 text-center showcase mp-4">Privacy</h1>
      <div className="container p-4 mp-4">
        <h3>Privacy Policy</h3>

        <body>
          "Your privacy is important to us. It is HFConsultant's policy to
          respect your privacy regarding any information we may collect from you
          across our platform. We only ask for personal information when we
          truly need it to provide a service to you. We collect it by fair and
          lawful means, with your knowledge and consent. We also let you know
          why we’re collecting it and how it will be used. We only retain
          collected information for as long as necessary to provide you with
          your requested service. What data we store, we’ll protect within
          commercially acceptable means to prevent loss and theft, as well as
          unauthorized access, disclosure, copying, use or modification. We
          don’t share any personally identifying information publicly or with
          third-parties, except when required to by law. Our platform may link
          to external sites that are not operated by us. Please be aware that we
          have no control over the content and practices of these sites, and
          cannot accept responsibility or liability for their respective privacy
          policies. You are free to refuse our request for your personal
          information, with the understanding that we may be unable to provide
          you with some of your desired services. Your continued use of our
          platform will be regarded as acceptance of our practices around
          privacy and personal information. If you have any questions about how
          we handle user data and personal information, feel free to contact
          us."
          <h6 className="text-center">
            This policy is effective as of April 1, 2022.
          </h6>
        </body>
      </div>
    </>
  );
};

export default Privacy;
