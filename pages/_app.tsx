// pages/_app.tsx
import { AppProps } from 'next/app';
 // Adjust according to your file structure
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
     
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  );
};

export default MyApp;
