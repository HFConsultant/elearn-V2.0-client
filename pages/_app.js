import { UserProvider } from "../context";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/styles.css" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
      <Footer />
    </UserProvider>
  );
}

export default MyApp;
