import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
const metadataSiteUrl =
  process.env.ODS_DOCS_SITE_URL?.trim() ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
  skipTrailingSlashRedirect: true,
  // Public origin, embedded at build-time so prerendered pages and dynamic 404s agree.
  env: {
    ODS_DOCS_SITE_URL: metadataSiteUrl,
  },
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
      {
        source: '/docs/ai-contact-center/api/tong-dai/khoi-tao-cuoc-goi',
        destination: '/docs/ai-contact-center/api/tong-dai/cuoc-goi/click-to-call',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
