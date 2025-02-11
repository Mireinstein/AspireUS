// pages/_app.js
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext'; 
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';

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
