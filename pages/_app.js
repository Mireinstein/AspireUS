// pages/_app.js
import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";


function MyApp({ Component, pageProps }) {
  const content =<Component {...pageProps} />;

  return (
    <>
    <Head>
        <link rel="icon" href="/aspireUS.svg" />
      </Head>
      <Header />
      <main>{content}</main>
      <Footer />
    </>
  );
}

export default MyApp;
