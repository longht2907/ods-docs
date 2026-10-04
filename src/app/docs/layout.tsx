import { DocsThemeScope } from '@/components/docs-theme-scope';
import {
  docsProducts,
  type DocsProductIcon,
} from '@/lib/docs-products';
import { docsOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import type * as PageTree from 'fumadocs-core/page-tree';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { LayoutTab } from 'fumadocs-ui/layouts/shared';
import type { LucideIcon } from 'lucide-react';
import {
  Cloud,
  KeyRound,
  PhoneCall,
  Server,
  Wrench,
} from 'lucide-react';

const productIcons: Record<DocsProductIcon, LucideIcon> = {
  phone: PhoneCall,
  cloud: Cloud,
  server: Server,
  managed: Wrench,
  license: KeyRound,
};

interface SidebarSection {
  landingLabel: string;
  landingUrl: string;
}

const sidebarSections: Readonly<Record<string, SidebarSection>> = {
  'ai-contact-center/user-guider-portal': {
    landingLabel: 'GIỚI THIỆU',
    landingUrl: '/docs/ai-contact-center/user-guider-portal',
  },
  'ai-contact-center/api': {
    landingLabel: 'Tổng quan API',
    landingUrl: '/docs/ai-contact-center/api',
  },
};

const sidebarItemLabels: Readonly<Record<string, string>> = {
  '/docs/ai-contact-center/user-guider-portal/01-tong-quan/quickstart/nhung-viec-can-lam-khi-bat-dau':
    'Những việc cần làm khi bắt đầu',
  '/docs/ai-contact-center/user-guider-portal/01-tong-quan/quickstart/huong-dan-dang-nhap':
    'Hướng dẫn đăng nhập',
  '/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/thong-ke-bao-cao-cuoc-goi':
    'Thống kê & báo cáo',
  '/docs/ai-contact-center/user-guider-portal/05-quan-ly-khach-hang/tong-quan-chuc-nang':
    'Tổng quan chức năng',
  '/docs/ai-contact-center/user-guider-portal/05-quan-ly-khach-hang/nhap-du-lieu-khach-hang':
    'Nhập dữ liệu khách hàng',
  '/docs/ai-contact-center/user-guider-portal/05-quan-ly-khach-hang/xem-va-chinh-sua-thong-tin':
    'Xem và chỉnh sửa thông tin',
  '/docs/ai-contact-center/user-guider-portal/07-quan-ly-hoi-thoai/quan-ly-tin-nhan-cuoc-goi':
    'Tin nhắn & cuộc gọi',
  '/docs/ai-contact-center/user-guider-portal/08-tich-hop-da-kenh/tich-hop-zalo-oa':
    'Zalo OA',
  '/docs/ai-contact-center/user-guider-portal/08-tich-hop-da-kenh/tich-hop-facebook-messenger':
    'Facebook Messenger',
};

const sidebarFolderLabels: Readonly<Record<string, string>> = {
  'ai-contact-center/user-guider-portal/09-thiet-lap-may-nhanh/softphone':
    'Softphone',
};

function transformSidebarNode(node: PageTree.Node): PageTree.Node {
  if (node.type === 'page') {
    const name = sidebarItemLabels[node.url];
    return name ? { ...node, name } : node;
  }

  if (node.type !== 'folder') {
    return node;
  }

  const folderPath = node.$ref?.folder;
  const section = folderPath ? sidebarSections[folderPath] : undefined;
  const folderName = folderPath ? sidebarFolderLabels[folderPath] : undefined;
  const children = node.children.map(transformSidebarNode);

  if (!section) {
    return {
      ...node,
      name: folderName ?? node.name,
      children,
    };
  }

  const childLanding = children.find(
    (child): child is PageTree.Item =>
      child.type === 'page' && child.url === section.landingUrl,
  );
  const landing = node.index ?? childLanding;

  if (!landing) {
    return { ...node, children };
  }

  const sectionChildren = children.map((child) =>
    child.type === 'page' && child.url === section.landingUrl
      ? { ...child, name: section.landingLabel }
      : child,
  );

  return {
    ...node,
    index: undefined,
    defaultOpen: true,
    children: childLanding
      ? sectionChildren
      : [{ ...landing, name: section.landingLabel }, ...sectionChildren],
  };
}

function getDocsPageTree(): PageTree.Root {
  const tree = source.getPageTree();

  return {
    ...tree,
    children: tree.children.map(transformSidebarNode),
  };
}

function transformTab(tab: LayoutTab): LayoutTab {
  for (const product of docsProducts) {
    if (tab.url === product.href) {
      const ProductIcon = productIcons[product.icon];
      return {
        ...tab,
        title: product.name,
        description: product.description,
        icon: <ProductIcon className="size-4 text-fd-primary" />,
      };
    }

  }

  return tab;
}

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsThemeScope>
      <DocsLayout
        tree={getDocsPageTree()}
        {...docsOptions()}
        tabMode="auto"
        tabs={{ transform: transformTab }}
        sidebar={{ defaultOpenLevel: 0 }}
      >
        {children}
      </DocsLayout>
    </DocsThemeScope>
  );
}
