import { getPageTreeRoots, type Folder, type Node, type Root } from 'fumadocs-core/page-tree';
import type { ReactNode } from 'react';
import { docsProducts, type DocsProduct } from './docs-products';
import { source } from './source';

export type HomeInternalHref = `/docs${string}`;

export interface HomeChapter {
  title: string;
  href: HomeInternalHref;
}

export interface HomeLink {
  title: string;
  description: string;
  href: HomeInternalHref;
}

export interface HomeRoleGroup {
  id: 'admin' | 'developer' | 'operations';
  label: string;
  eyebrow: string;
  description: string;
  links: readonly [HomeLink, HomeLink, HomeLink];
}

export interface HomeContentModel {
  searchSuggestions: readonly HomeSearchSuggestion[];
  portalChapters: readonly HomeChapter[];
  featuredPortalChapters: readonly HomeChapter[];
  documentedProductCount: number;
  apiCapability: string;
  aiProduct: DocsProduct;
  cloudFileProduct: DocsProduct;
  roleGroups: readonly HomeRoleGroup[];
}

export interface HomeSearchSuggestion {
  label: string;
  href: HomeInternalHref;
}

const portalHref = '/docs/ai-contact-center/user-guider-portal';

const searchSuggestions: readonly HomeSearchSuggestion[] = [
  {
    label: 'Tạo máy nhánh',
    href: '/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/tao-cau-hinh-may-nhanh',
  },
  {
    label: 'Webhook cuộc gọi',
    href: '/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/webhook-va-popup',
  },
  { label: 'Đồng bộ CloudFile', href: '/docs/cloudfile' },
] as const;

const roleGroups: readonly HomeRoleGroup[] = [
  {
    id: 'admin',
    label: 'Quản trị viên',
    eyebrow: 'Thiết lập và phân quyền',
    description: 'Khởi tạo người dùng, kiểm soát quyền và tổ chức dữ liệu doanh nghiệp.',
    links: [
      {
        title: 'Tạo tài khoản người dùng',
        description: 'Tạo tài khoản Portal và gán tổng đài phù hợp.',
        href: '/docs/ai-contact-center/user-guider-portal/03-quan-ly-nguoi-dung/tao-tai-khoan-nguoi-dung',
      },
      {
        title: 'Thiết lập phân quyền',
        description: 'Kiểm soát quyền truy cập theo vai trò và bộ phận.',
        href: '/docs/ai-contact-center/user-guider-portal/03-quan-ly-nguoi-dung/thiet-lap-phan-quyen',
      },
      {
        title: 'Quản trị CloudFile',
        description: 'Thiết lập không gian lưu trữ và chính sách chia sẻ.',
        href: '/docs/cloudfile',
      },
    ],
  },
  {
    id: 'developer',
    label: 'Developer',
    eyebrow: 'API và tích hợp',
    description: 'Kết nối CRM, nhận sự kiện cuộc gọi và mở rộng trải nghiệm đa kênh.',
    links: [
      {
        title: 'API tích hợp cuộc gọi',
        description: 'Khởi tạo Click-to-Call và làm việc với REST API.',
        href: '/docs/ai-contact-center/api',
      },
      {
        title: 'Webhook và Popup',
        description: 'Nhận event cuộc gọi trong hệ thống doanh nghiệp.',
        href: '/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/webhook-va-popup',
      },
      {
        title: 'Tích hợp Zalo OA',
        description: 'Kết nối kênh Zalo với luồng chăm sóc khách hàng.',
        href: '/docs/ai-contact-center/user-guider-portal/08-tich-hop-da-kenh/tich-hop-zalo-oa',
      },
    ],
  },
  {
    id: 'operations',
    label: 'Vận hành',
    eyebrow: 'Giám sát hằng ngày',
    description: 'Theo dõi chất lượng cuộc gọi, lịch sử hoạt động và trạng thái đồng bộ.',
    links: [
      {
        title: 'Giám sát cuộc gọi',
        description: 'Theo dõi realtime và đánh giá chất lượng vận hành.',
        href: '/docs/ai-contact-center/user-guider-portal/06-quan-ly-cuoc-goi/huong-dan-giam-sat-cuoc-goi',
      },
      {
        title: 'Lịch sử cuộc gọi',
        description: 'Tra cứu cuộc gọi vào, gọi ra và cuộc gọi nhỡ.',
        href: '/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/lich-su-cuoc-goi',
      },
      {
        title: 'Đồng bộ CloudFile',
        description: 'Vận hành đồng bộ thiết bị và chia sẻ dữ liệu an toàn.',
        href: '/docs/cloudfile',
      },
    ],
  },
] as const;

function getTextName(name: ReactNode, context: string): string {
  if (typeof name === 'string' || typeof name === 'number') return String(name);
  throw new Error(`${context} phải có tên dạng text để hiển thị trên Home.`);
}

function findFolderByIndexUrl(nodes: readonly Node[], url: string): Folder | undefined {
  for (const node of nodes) {
    if (node.type !== 'folder') continue;
    if (node.index?.url === url) return node;
    const nested = findFolderByIndexUrl(node.children, url);
    if (nested) return nested;
  }

  return undefined;
}

function isHomeInternalHref(url: string): url is HomeInternalHref {
  return url === '/docs' || url.startsWith('/docs/');
}

function getFolderPageUrl(folder: Folder): string | undefined {
  return folder.index?.url
    ?? folder.children.find((node) => node.type === 'page')?.url;
}

function getPortalChapters(tree: Root): readonly HomeChapter[] {
  const portal = getPageTreeRoots(tree).find((root) => {
    if (root.type === 'folder') return getFolderPageUrl(root) === portalHref;
    return root.children.some((node) => node.type === 'page' && node.url === portalHref);
  }) ?? findFolderByIndexUrl(tree.children, portalHref);
  if (!portal) throw new Error(`Không tìm thấy Portal root "${portalHref}" trong Page Tree.`);

  const chapters = portal.children.flatMap<HomeChapter>((node) => {
    if (node.type !== 'folder') return [];
    const chapterUrl = getFolderPageUrl(node);
    if (!chapterUrl?.startsWith(`${portalHref}/`) || !isHomeInternalHref(chapterUrl)) return [];

    return [{
      title: getTextName(node.name, `Chapter ${chapterUrl}`),
      href: chapterUrl,
    }];
  });

  if (chapters.length === 0) {
    throw new Error('Portal Page Tree không có chapter top-level để hiển thị trên Home.');
  }

  return chapters;
}

function getProduct(slug: string): DocsProduct {
  const product = docsProducts.find((item) => item.slug === slug);
  if (!product) throw new Error(`Không tìm thấy docs product "${slug}".`);
  return product;
}

function validateInternalLinks(groups: readonly HomeRoleGroup[], suggestions: readonly HomeSearchSuggestion[]) {
  const links = [
    ...suggestions.map((suggestion) => suggestion.href),
    ...groups.flatMap((group) => group.links.map((link) => link.href)),
  ];

  for (const href of links) {
    if (!source.getPageByUrl(href)) {
      throw new Error(`Home link không tồn tại trong public docs: ${href}`);
    }
  }
}

export function getHomeContentModel(): HomeContentModel {
  const portalChapters = getPortalChapters(source.getPageTree());
  const aiProduct = getProduct('ai-contact-center');
  const cloudFileProduct = getProduct('cloudfile');
  const apiCapability = aiProduct.capabilities.find(
    (capability) => capability.includes('API') && capability.includes('Webhook'),
  );

  if (!apiCapability) {
    throw new Error('AI Contact Center chưa khai báo capability REST API và Webhook.');
  }

  validateInternalLinks(roleGroups, searchSuggestions);

  return {
    searchSuggestions,
    portalChapters,
    featuredPortalChapters: portalChapters.slice(0, 3),
    documentedProductCount: docsProducts.length,
    apiCapability,
    aiProduct,
    cloudFileProduct,
    roleGroups,
  };
}
