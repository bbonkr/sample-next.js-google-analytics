import React, { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';

interface GoogleAnalyticsProviderProps {}

export const GoogleAnalyticsProvider = ({
    children,
}: React.PropsWithChildren<GoogleAnalyticsProviderProps>) => {
    const router = useRouter();
    const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

    const gtagConfig = () => {
        if (typeof window !== 'undefined' && googleAnalyticsId) {
            const { title } = window.document;
            const { href, pathname } = window.location;

            console.info('🔨 gtag -> config', pathname);

            gtag('config', googleAnalyticsId, {
                page_title: title,
                page_location: href,
                page_path: pathname,
            });
        }
    };

    const handleRouteChangeComplete = (url: string) => {
        console.info('🔨 routeChangeComplete', url);
        gtagConfig();
    };

    useEffect(() => {
        console.info('✅ googleAnalyticsId: ', googleAnalyticsId);
        if (googleAnalyticsId) {
            router.events.on('routeChangeComplete', handleRouteChangeComplete);
            gtagConfig();
        }
        return () => {
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [router.events]);

    return (
        <React.Fragment>
            {children}
            {googleAnalyticsId && (
                <React.Fragment>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
                        strategy="beforeInteractive"
                        async
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');`,
                        }}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};
