// pages/_app.js
import '../styles/globals.css';
import { AuthProvider } from '../src/context/AuthContext';
import Navbar from '../src/components/Common/Navbar';
import Footer from '../src/components/Common/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default MyApp;
