import 'react-toastify/dist/ReactToastify.css';

import Layout from '@components/Layout';
import { initializeFirebase } from '@lib/firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

import theme from '../src/theme/mui';

const App = ({ Component, pageProps, router }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    initializeFirebase();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>RSVP Events</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          position={toast.POSITION.BOTTOM_RIGHT}
          autoClose={2000}
        />
        <Layout currentRoute={router.route}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
