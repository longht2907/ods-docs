import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: '/docs/ai-contact-center/autocall',
        destination: '/docs/ai-contact-center/huong-dan/autocall',
        permanent: true,
      },
      {
        source: '/docs/ai-contact-center/xu-ly-su-co',
        destination: '/docs/ai-contact-center/huong-dan/xu-ly-su-co',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
