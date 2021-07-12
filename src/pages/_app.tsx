import React from 'react';
import { GoogleAnalyticsProvider } from '../components/GoogleAnalyticsProvider';
import { Header } from '../components/Header';

const CustomApp = ({ Component, pageProps }) => {
    return (
        <GoogleAnalyticsProvider>
            <header>
                <Header />
            </header>
            <main>
                <Component {...pageProps} />
            </main>
        </GoogleAnalyticsProvider>
    );
};

export default CustomApp;
