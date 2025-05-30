import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/config/translation/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns:[
      {protocol:'https',hostname:'lh3.googleusercontent.com'},
      {protocol:'https',hostname:'avatars.githubusercontent.com'},
    ]
  },
};

export default withNextIntl(nextConfig);
