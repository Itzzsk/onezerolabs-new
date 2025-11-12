import '../styles/globals.css'
import Navbar from '../components/Navbar'
import SmoothScroll from '../components/SmoothScroll'

export const metadata = {
  title: {
    default: 'OneZeroLabs | Full-Stack Development Solutions',
    template: '%s | OneZeroLabs'
  },
  description: 'Professional web and mobile app development services for modern businesses. We specialize in AI-powered platforms, brand experiences, and custom software solutions.',
  keywords: ['web development', 'mobile app development', 'full-stack development', 'OneZeroLabs', 'AI platforms', 'brand design', 'UI/UX design', 'software solutions'],
  authors: [{ name: 'OneZeroLabs', url: 'https://onezerolabs.com' }],
  creator: 'OneZeroLabs',
  publisher: 'OneZeroLabs',
  metadataBase: new URL('https://onezerolabs.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'OneZeroLabs | Full-Stack Development Solutions',
    description: 'Professional web and mobile app development services for modern businesses',
    url: 'https://onezerolabs.com',
    siteName: 'OneZeroLabs',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OneZeroLabs - Full-Stack Development Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneZeroLabs | Full-Stack Development Solutions',
    description: 'Professional web and mobile app development services for modern businesses',
    creator: '@onezerolabs',
    images: ['/twitter-image.jpg'],
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#000000' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'dark',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <SmoothScroll>
          <Navbar />
          <main id="main-content" role="main">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  )
}
