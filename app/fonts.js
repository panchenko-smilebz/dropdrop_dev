import localFont from 'next/font/local';

export const fixelDisplay = localFont({
  src: [
    {
      path: '../public/fonts/FixelDisplay-Black-subset.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-fixel-display',
  display: 'swap',
});

export const fixelText = localFont({
  src: [
    {
      path: '../public/fonts/FixelText-Regular-subset.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/FixelText-Medium-subset.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-fixel-text',
  display: 'swap',
});

export const menlo = localFont({
  src: [
    {
      path: '../public/fonts/Menlo-Regular-subset.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-menlo',
  display: 'swap',
});
