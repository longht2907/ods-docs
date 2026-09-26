export type DocsProductIcon = 'phone' | 'cloud' | 'server' | 'shield';
export type DocsProductAccent = 'orange' | 'sky' | 'violet' | 'emerald';

export interface DocsProduct {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  landingSummary: string;
  href: `/docs/${string}`;
  productUrl: `https://ods.vn/${string}`;
  icon: DocsProductIcon;
  accent: DocsProductAccent;
  capabilities: readonly string[];
}

/**
 * Presentation registry for public product documentation.
 *
 * The Fumadocs Page Tree remains authoritative for sidebar content. This
 * registry supplies the richer labels and descriptions used by the home page
 * and global navigation. Every entry must map to a root folder in
 * `content/docs/<slug>/meta.json`.
 */
export const docsProducts = [
  {
    slug: 'ai-contact-center',
    name: 'AI Contact Center',
    shortName: 'AI Contact Center',
    category: 'AI và trải nghiệm khách hàng',
    description:
      'Vận hành tổng đài đa kênh, cấu hình Portal, giám sát cuộc gọi và tích hợp REST API hoặc Webhook thông minh.',
    landingSummary:
      'Hướng dẫn quản trị tổng đài, vận hành Agent và tích hợp luồng thoại vào hệ thống doanh nghiệp.',
    href: '/docs/ai-contact-center',
    productUrl: 'https://ods.vn/ai-contact-center',
    icon: 'phone',
    accent: 'orange',
    capabilities: [
      'Định tuyến IVR',
      'AutoCall và Voice OTP',
      'REST API và Webhook',
    ],
  },
  {
    slug: 'cloudfile',
    name: 'CloudFile',
    shortName: 'CloudFile',
    category: 'Lưu trữ và đồng bộ Cloud',
    description:
      'Lưu trữ, đồng bộ và chia sẻ dữ liệu doanh nghiệp an toàn với mô hình phân quyền theo phòng ban và dự án.',
    landingSummary:
      'Tài liệu thiết lập không gian lưu trữ, đồng bộ thiết bị và quản trị quyền truy cập dữ liệu.',
    href: '/docs/cloudfile',
    productUrl: 'https://ods.vn/cloud-files',
    icon: 'cloud',
    accent: 'sky',
    capabilities: [
      'Đồng bộ Windows và macOS',
      'Phân quyền phòng ban',
      'Chia sẻ tệp bảo mật',
    ],
  },
] as const satisfies readonly DocsProduct[];

export const odsExternalLinks = {
  website: 'https://ods.vn/',
  blog: 'https://ods.vn/tin-cong-nghe',
  contact: 'https://ods.vn/contact-us',
  support: 'https://support.ods.vn/',
  identity: 'https://id.ods.vn/',
} as const;
