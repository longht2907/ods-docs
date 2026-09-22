import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: '/docs/ai-contact-center/autocall',
        destination: '/docs/ai-contact-center/user-guider-portal',
        permanent: true,
      },
      {
        source: '/docs/ai-contact-center/xu-ly-su-co',
        destination: '/docs/ai-contact-center/user-guider-portal',
        permanent: true,
      },
      {
        source: '/docs/ai-contact-center/huong-dan',
        destination: '/docs/ai-contact-center/user-guider-portal',
        permanent: true,
      },
      {
        source: '/docs/ai-contact-center/huong-dan/:path*',
        destination: '/docs/ai-contact-center/user-guider-portal',
        permanent: true,
      },
      {
        source: '/docs/ai-contact-center/user-guide-portal/:path*',
        destination: '/docs/ai-contact-center/user-guider-portal',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
