// pages/_app.js
import "../styles/globals.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../../msalConfig";

// Create your MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

function MyApp({ Component, pageProps }) {
  // If the page is marked as protected, wrap it in the AuthGuard.
  const content = Component.protected ? (
    <AuthGuard>
      <Component {...pageProps} />
    </AuthGuard>
  ) : (
    <Component {...pageProps} />
  );

  return (
    <>
    <Head>
        <link rel="icon" href="/aspireUS.svg" />
      </Head>
      <Navbar />
      <main>{content}</main>
      <Footer />
    </>
  );
}

export default MyApp;
