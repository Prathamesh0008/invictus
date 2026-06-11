import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppSticky from "./components/WhatsAppSticky";
import CallSticky from "./components/CallSticky";
import Script from "next/script";
import { Crimson_Text } from "next/font/google";

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson-text",
  display: "swap",
});

const orbitron = localFont({
  src: [
    {
      path: "./fonts/orbitron-black.otf",
      weight: "900", // black = heavy
      style: "normal",
    },
  ],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata = {
  title: "Invictus Logistics",
  description: "Revolutionizing global supply chains with cutting-edge technology, real-time visibility, and unparalleled security for your shipments.",
  metadataBase: new URL('https://www.invictuslogi.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "nx8OJJKpJ5Bahc0uME80p6Y84T4uLMBqBcXZrtGn5vA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Explicit Robots Meta Tags - Complete configuration */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large" />
        
        {/* Canonical Tag - Explicitly added */}
        <link rel="canonical" href="https://www.invictuslogi.com/" />
        
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4B51BFHSQ2"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4B51BFHSQ2');
            `,
          }}
        />
        
        {/* Google Tag Manager Script */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WH6QW7FR');`
          }}
        />

        {/* Combined Schema Markup - All in one */}
        <Script
          id="schema-markup"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.invictuslogi.com/#organization",
                  "name": "Invictus Logi",
                  "url": "https://www.invictuslogi.com/",
                  "logo": "https://www.invictuslogi.com/logo/logo2.png",
                  "image": "https://www.invictuslogi.com/logo/logo2.png",
                  "email": "info@invictuslogi.com",
                  "telephone": "+31685865799",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Leyweg 836",
                    "addressLocality": "The Hague",
                    "postalCode": "2545GR",
                    "addressCountry": "NL"
                  },
                  "sameAs": []
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.invictuslogi.com/#website",
                  "url": "https://www.invictuslogi.com/",
                  "name": "Invictus Logi",
                  "publisher": {
                    "@id": "https://www.invictuslogi.com/#organization"
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.invictuslogi.com/?s={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "MovingCompany",
                  "@id": "https://www.invictuslogi.com/#localbusiness",
                  "name": "Invictus Logi",
                  "url": "https://www.invictuslogi.com/",
                  "image": "https://www.invictuslogi.com/logo/logo2.png",
                  "telephone": "+31685865799",
                  "email": "info@invictuslogi.com",
                  "priceRange": "$$",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Leyweg 836",
                    "addressLocality": "The Hague",
                    "postalCode": "2545GR",
                    "addressCountry": "Netherlands"
                  },
                  "areaServed": "Netherlands"
                },
                {
                  "@type": "Service",
                  "serviceType": "Logistics Services",
                  "provider": {
                    "@id": "https://www.invictuslogi.com/#organization"
                  },
                  "areaServed": {
                    "@type": "Country",
                    "name": "Netherlands"
                  }
                },
                {
                  "@type": "ContactPage",
                  "@id": "https://www.invictuslogi.com/contact/#contactpage",
                  "url": "https://www.invictuslogi.com/contact",
                  "name": "Contact Invictus Logi",
                  "mainEntity": {
                    "@id": "https://www.invictuslogi.com/#organization"
                  }
                },
                {
                  "@type": "AboutPage",
                  "@id": "https://www.invictuslogi.com/about/#aboutpage",
                  "url": "https://www.invictuslogi.com/about",
                  "name": "About Invictus Logi",
                  "mainEntity": {
                    "@id": "https://www.invictuslogi.com/#organization"
                  }
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.invictuslogi.com/#breadcrumb",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://www.invictuslogi.com/"
                    }
                  ]
                }
              ]
            })
          }}
        />
      </head>
     <body className={`${orbitron.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-WH6QW7FR"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        
        <Navbar />
        <main className="flex-grow overflow-x-hidden">{children}</main>
        <Footer />
        <CallSticky />
        <WhatsAppSticky />
              <body className={crimsonText.className}></body>
      </body>
    </html>
  );
}

