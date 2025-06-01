import { fixelDisplay, fixelText, menlo } from './fonts';
import './globals.css';

export const metadata = {
  title: 'Dropbox to Webflow Video Embed | by Vitaliy Panchenko',
  description:
    'Avoid Vimeo Pro fees by converting your Dropbox video into a multi-format tag, ready to seamlessly integrate into Webflow.',
  openGraph: {
    title: 'Dropbox to Webflow Video Embed | by Vitaliy Panchenko',
    description:
      'Avoid Vimeo Pro fees by converting your Dropbox video into a multi-format tag, ready to seamlessly integrate into Webflow.',
    url: 'https://dropdrop.video',
    siteName: 'Panchenko Design',
    images: [
      {
        url: 'https://dropdrop.video/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dropbox to Webflow Video Embed',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dropbox to Webflow Video Embed | by Vitaliy Panchenko',
    description:
      'Avoid Vimeo Pro fees by converting your Dropbox video into a multi-format tag, ready to seamlessly integrate into Webflow.',
    images: ['https://dropdrop.video/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fixelDisplay.variable} ${fixelText.variable} ${menlo.variable} font-sans`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="DropDrop" />
      </head>
      <body>{children}</body>
    </html>
  );
}
