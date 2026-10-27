import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
const metadataSiteUrl =
  process.env.ODS_DOCS_SITE_URL?.trim() ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '');
const legacyPortalBase = '/docs/ai-contact-center/user-guider-portal';
const portalBase = '/docs/ai-contact-center/portal';
const portalSectionRedirects = [
  ['01-tong-quan', 'tong-quan'],
  ['02-quan-ly-dich-vu', 'dich-vu'],
  ['03-quan-ly-nguoi-dung', 'nguoi-dung'],
  ['04-thiet-lap-tong-dai', 'tong-dai'],
  ['05-quan-ly-khach-hang', 'khach-hang'],
  ['06-quan-ly-cuoc-goi', 'cuoc-goi'],
  ['07-quan-ly-hoi-thoai', 'hoi-thoai'],
  ['08-tich-hop-da-kenh', 'tich-hop'],
  ['09-thiet-lap-may-nhanh', 'may-nhanh'],
  ['10-goi-tu-dong', 'autocall'],
];

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
        source: `${legacyPortalBase}/06-quan-ly-cuoc-goi/huong-dan-giam-sat-cuoc-goi`,
        destination: `${portalBase}/cuoc-goi/giam-sat`,
        permanent: true,
      },
      ...portalSectionRedirects.map(([legacySection, section]) => ({
        source: `${legacyPortalBase}/${legacySection}/:path*`,
        destination: `${portalBase}/${section}/:path*`,
        permanent: true,
      })),
      {
        source: legacyPortalBase,
        destination: portalBase,
        permanent: true,
      },
      {
        source: `${legacyPortalBase}/:path*`,
        destination: `${portalBase}/:path*`,
        permanent: true,
      },
      {
        source: '/docs/ai-contact-center/autocall',
        destination: portalBase,
        permanent: true,
      },
      {
        source: '/docs/ai-contact-center/xu-ly-su-co',
        destination: portalBase,
        permanent: true,
      },
      {
        source: '/docs/ai-contact-center/huong-dan',
        destination: portalBase,
        permanent: true,
      },
      {
        source: '/docs/ai-contact-center/huong-dan/:path*',
        destination: portalBase,
        permanent: true,
      },
      {
        source: '/docs/ai-contact-center/user-guide-portal/:path*',
        destination: portalBase,
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
