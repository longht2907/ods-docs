import { docsProducts, type DocsProduct } from './docs-products';
import { source } from './source';

export type HomeInternalHref = `/docs${string}`;

export interface HomeLink {
  title: string;
  description: string;
  href: HomeInternalHref;
}

export interface HomeRoleGroup {
  id: 'admin' | 'developer' | 'agent' | 'operations';
  label: string;
  eyebrow: string;
  description: string;
  links: readonly [HomeLink, HomeLink, HomeLink];
}

export interface HomeContentModel {
  searchSuggestions: readonly HomeSearchSuggestion[];
  products: readonly DocsProduct[];
  roleGroups: readonly HomeRoleGroup[];
}

export interface HomeSearchSuggestion {
  label: string;
  href: HomeInternalHref;
}

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
    id: 'agent',
    label: 'Agent',
    eyebrow: 'Làm việc với khách hàng',
    description: 'Tra cứu khách hàng, xử lý hội thoại và sử dụng các công cụ liên lạc hằng ngày.',
    links: [
      {
        title: 'Bắt đầu sử dụng Tổng đài ảo',
        description: 'Nắm các bước cần thiết trước khi tiếp nhận và thực hiện cuộc gọi.',
        href: '/docs/ai-contact-center/user-guider-portal/01-tong-quan/quickstart/nhung-viec-can-lam-khi-bat-dau',
      },
      {
        title: 'Quản lý hội thoại',
        description: 'Theo dõi tin nhắn và cuộc gọi trong một luồng làm việc.',
        href: '/docs/ai-contact-center/user-guider-portal/07-quan-ly-hoi-thoai/quan-ly-tin-nhan-cuoc-goi',
      },
      {
        title: 'Tra cứu khách hàng',
        description: 'Xem và cập nhật thông tin khách hàng trong quá trình hỗ trợ.',
        href: '/docs/ai-contact-center/user-guider-portal/05-quan-ly-khach-hang/xem-va-chinh-sua-thong-tin',
      },
    ],
  },
  {
    id: 'operations',
    label: 'Giám sát',
    eyebrow: 'Theo dõi vận hành',
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
  validateInternalLinks(roleGroups, searchSuggestions);

  return {
    searchSuggestions,
    products: docsProducts,
    roleGroups,
  };
}
