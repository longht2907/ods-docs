import { source } from './source';

export type HomeInternalHref = `/docs${string}`;
export type HomeLibraryIcon = 'book' | 'phone' | 'code' | 'cloud';
export type HomeProductSlug = 'ai-contact-center' | 'cloudfile';
export type HomeIntegrationIcon = 'api' | 'webhook';

export interface HomeSearchSuggestion {
  label: string;
  href: HomeInternalHref;
}

export interface HomeGuideLink {
  label: string;
  href: HomeInternalHref;
}

export interface HomeGuideGroup {
  title: string;
  links: readonly HomeGuideLink[];
}

export interface HomeProductGuide {
  productSlug: HomeProductSlug;
  groups: readonly HomeGuideGroup[];
}

export interface HomeLibraryDocument {
  title: string;
  product: string;
  contentType: string;
  description: string;
  href: HomeInternalHref;
  icon: HomeLibraryIcon;
}

export interface HomeIntegrationEntry {
  id: 'api' | 'webhook';
  title: string;
  description: string;
  href: HomeInternalHref;
  icon: HomeIntegrationIcon;
}

export interface HomeContentModel {
  searchSuggestions: readonly HomeSearchSuggestion[];
  productGuides: readonly HomeProductGuide[];
  libraryDocuments: readonly HomeLibraryDocument[];
  integrationEntries: readonly HomeIntegrationEntry[];
}

const searchSuggestions: readonly HomeSearchSuggestion[] = [
  {
    label: 'Tạo máy nhánh',
    href: '/docs/ai-contact-center/portal/tong-dai/cai-dat/tao-cau-hinh-may-nhanh',
  },
  {
    label: 'Webhook & Popup',
    href: '/docs/ai-contact-center/portal/tong-dai/cai-dat/webhook-va-popup',
  },
  { label: 'Hướng dẫn CloudFile', href: '/docs/cloudfile' },
] as const;

const productGuides: readonly HomeProductGuide[] = [
  {
    productSlug: 'ai-contact-center',
    groups: [
      {
        title: 'Sử dụng sản phẩm',
        links: [
          { label: 'Tổng quan', href: '/docs/ai-contact-center' },
          { label: 'Portal', href: '/docs/ai-contact-center/portal' },
          {
            label: 'Cấu hình máy nhánh',
            href: '/docs/ai-contact-center/portal/tong-dai/cai-dat/tao-cau-hinh-may-nhanh',
          },
        ],
      },
      {
        title: 'Tích hợp hệ thống',
        links: [
          { label: 'API Reference', href: '/docs/ai-contact-center/api' },
          {
            label: 'Webhook & Popup',
            href: '/docs/ai-contact-center/portal/tong-dai/cai-dat/webhook-va-popup',
          },
        ],
      },
    ],
  },
  {
    productSlug: 'cloudfile',
    groups: [
      {
        title: 'Sử dụng sản phẩm',
        links: [{ label: 'Hướng dẫn sử dụng CloudFile', href: '/docs/cloudfile' }],
      },
    ],
  },
] as const;

const libraryDocuments: readonly HomeLibraryDocument[] = [
  {
    title: 'Bắt đầu với AI Contact Center',
    product: 'AI Contact Center',
    contentType: 'Tổng quan',
    description: 'Lộ trình tài liệu và các nhóm chức năng chính của sản phẩm.',
    href: '/docs/ai-contact-center',
    icon: 'book',
  },
  {
    title: 'Hướng dẫn sử dụng Portal',
    product: 'AI Contact Center',
    contentType: 'Hướng dẫn Portal',
    description: 'Làm quen với trang quản trị và quy trình vận hành tổng đài.',
    href: '/docs/ai-contact-center/portal',
    icon: 'book',
  },
  {
    title: 'Tạo và cấu hình máy nhánh',
    product: 'AI Contact Center',
    contentType: 'Cấu hình',
    description: 'Thiết lập máy nhánh để bắt đầu nhận và thực hiện cuộc gọi.',
    href: '/docs/ai-contact-center/portal/tong-dai/cai-dat/tao-cau-hinh-may-nhanh',
    icon: 'phone',
  },
  {
    title: 'Webhook & Popup',
    product: 'AI Contact Center',
    contentType: 'Webhook',
    description: 'Kết nối sự kiện cuộc gọi với CRM hoặc ứng dụng nghiệp vụ.',
    href: '/docs/ai-contact-center/portal/tong-dai/cai-dat/webhook-va-popup',
    icon: 'code',
  },
  {
    title: 'API Reference',
    product: 'AI Contact Center',
    contentType: 'REST API',
    description: 'Điểm bắt đầu cho Click-to-Call, AutoCall và các API tích hợp.',
    href: '/docs/ai-contact-center/api',
    icon: 'code',
  },
  {
    title: 'Bắt đầu với CloudFile',
    product: 'CloudFile',
    contentType: 'Hướng dẫn sử dụng',
    description: 'Thiết lập lưu trữ, đồng bộ và chia sẻ dữ liệu CloudFile.',
    href: '/docs/cloudfile',
    icon: 'cloud',
  },
] as const;

const integrationEntries: readonly HomeIntegrationEntry[] = [
  {
    id: 'api',
    title: 'API Reference',
    description: 'Tra cứu REST API để kết nối AI Contact Center với ứng dụng của bạn.',
    href: '/docs/ai-contact-center/api',
    icon: 'api',
  },
  {
    id: 'webhook',
    title: 'Webhook & Popup',
    description: 'Nhận sự kiện cuộc gọi và mở thông tin khách hàng trong hệ thống nghiệp vụ.',
    href: '/docs/ai-contact-center/portal/tong-dai/cai-dat/webhook-va-popup',
    icon: 'webhook',
  },
] as const;

function validateInternalLinks(links: readonly HomeInternalHref[]) {
  for (const href of new Set(links)) {
    if (!source.getPageByUrl(href)) {
      throw new Error(`Home link không tồn tại trong public docs: ${href}`);
    }
  }
}

export function getHomeContentModel(): HomeContentModel {
  validateInternalLinks([
    ...searchSuggestions.map(({ href }) => href),
    ...productGuides.flatMap(({ groups }) =>
      groups.flatMap(({ links }) => links.map(({ href }) => href)),
    ),
    ...libraryDocuments.map(({ href }) => href),
    ...integrationEntries.map(({ href }) => href),
  ]);

  return {
    searchSuggestions,
    productGuides,
    libraryDocuments,
    integrationEntries,
  };
}
