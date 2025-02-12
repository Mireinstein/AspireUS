// pages/_app.js
import '../styles/globals.css';
import Head from 'next/head';
import { AuthProvider } from '../context/AuthContext'; 
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <link rel="icon" href="/aspireUS.svg" />
      </Head>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default MyApp;
