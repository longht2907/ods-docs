import {
  odsSolutionGroups,
  type OdsSolutionIcon,
  type OdsSolutionProduct,
} from './ods-solutions';

export type DocsProductIcon = OdsSolutionIcon;
export type DocsProductAccent = 'orange' | 'sky' | 'violet' | 'emerald';
export type DocsSectionIcon = 'book-open' | 'braces';
export type DocsSectionKind = 'guide' | 'api';

export interface DocsProductSection {
  kind: DocsSectionKind;
  title: string;
  description: string;
  href: `/docs/${string}`;
  icon: DocsSectionIcon;
}

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
  sections: readonly DocsProductSection[];
}

export interface DocsProductProfile {
  slug: string;
  shortName: string;
  category: string;
  description: string;
  landingSummary: string;
  accent: DocsProductAccent;
  capabilities: readonly string[];
  sections: readonly DocsProductSection[];
}

/**
 * Documentation-only presentation metadata.
 *
 * Product identity, marketing URL and icon are derived from `odsSolutionGroups`.
 * The Fumadocs Page Tree remains authoritative for sidebar content.
 */
export const docsProductProfiles: readonly DocsProductProfile[] = [
  {
    slug: 'ai-contact-center',
    shortName: 'AI Contact Center',
    category: 'AI và trải nghiệm khách hàng',
    description:
      'Vận hành tổng đài đa kênh, cấu hình Portal, giám sát cuộc gọi và tích hợp REST API hoặc Webhook thông minh.',
    landingSummary:
      'Hướng dẫn quản trị tổng đài, vận hành Agent và tích hợp luồng thoại vào hệ thống doanh nghiệp.',
    accent: 'orange',
    capabilities: [
      'Định tuyến IVR',
      'AutoCall và Voice OTP',
      'REST API và Webhook',
    ],
    sections: [
      {
        kind: 'guide',
        title: 'Hướng dẫn sử dụng',
        description: 'Thiết lập và vận hành AI Contact Center trên Portal.',
        href: '/docs/ai-contact-center/user-guider-portal',
        icon: 'book-open',
      },
      {
        kind: 'api',
        title: 'API Reference',
        description: 'REST API và Webhook dành cho tích hợp hệ thống.',
        href: '/docs/ai-contact-center/api',
        icon: 'braces',
      },
    ],
  },
  {
    slug: 'cloudfile',
    shortName: 'CloudFile',
    category: 'Lưu trữ và đồng bộ Cloud',
    description:
      'Lưu trữ, đồng bộ và chia sẻ dữ liệu doanh nghiệp an toàn với mô hình phân quyền theo phòng ban và dự án.',
    landingSummary:
      'Tài liệu thiết lập không gian lưu trữ, đồng bộ thiết bị và quản trị quyền truy cập dữ liệu.',
    accent: 'sky',
    capabilities: [
      'Đồng bộ Windows và macOS',
      'Phân quyền phòng ban',
      'Chia sẻ tệp bảo mật',
    ],
    sections: [
      {
        kind: 'guide',
        title: 'Hướng dẫn sử dụng',
        description: 'Thiết lập, đồng bộ và quản trị dữ liệu CloudFile.',
        href: '/docs/cloudfile',
        icon: 'book-open',
      },
    ],
  },
];

interface DocumentedSolutionProduct {
  product: OdsSolutionProduct & { docsSlug: string };
  icon: OdsSolutionIcon;
}

function collectDocumentedProducts(): DocumentedSolutionProduct[] {
  const documented: DocumentedSolutionProduct[] = [];

  for (const group of odsSolutionGroups) {
    for (const product of group.products) {
      if (!product.docsSlug) continue;
      documented.push({
        product: { ...product, docsSlug: product.docsSlug },
        icon: group.icon,
      });
    }
  }

  return documented;
}

function buildDocsProducts(): readonly DocsProduct[] {
  const documented = collectDocumentedProducts();
  const documentedSlugs = new Set(documented.map(({ product }) => product.docsSlug));
  const profileSlugs = new Set(docsProductProfiles.map((profile) => profile.slug));

  if (
    documented.length !== documentedSlugs.size ||
    docsProductProfiles.length !== profileSlugs.size ||
    documentedSlugs.size !== profileSlugs.size
  ) {
    throw new Error('Catalog sản phẩm và profile tài liệu không đồng bộ.');
  }

  return docsProductProfiles.map((profile) => {
    const source = documented.find(({ product }) => product.docsSlug === profile.slug);
    if (!source) {
      throw new Error(`Không tìm thấy sản phẩm canonical cho docs slug "${profile.slug}".`);
    }

    return {
      ...profile,
      name: source.product.name,
      productUrl: source.product.productUrl,
      icon: source.icon,
      href: `/docs/${source.product.docsSlug}`,
    };
  });
}

export const docsProducts = buildDocsProducts();

export const odsExternalLinks = {
  website: 'https://ods.vn/',
  blog: 'https://ods.vn/tin-cong-nghe',
  contact: 'https://ods.vn/contact-us',
  support: 'https://support.ods.vn/',
  identity: 'https://id.ods.vn/',
} as const;
