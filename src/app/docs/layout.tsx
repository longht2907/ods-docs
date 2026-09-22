import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import Link from 'next/link';
import { BookOpenText, CircleHelp, Gauge, Rocket } from 'lucide-react';
import { DocsContainer } from '@/components/docs-container';
import { TopNav } from '@/components/top-nav';

function SharedDocsNavigation() {
  return (
    <div className="border-t px-3 py-4">
      <p className="mb-2 px-2 text-xs font-medium text-fd-muted-foreground">
        Tài liệu dùng chung
      </p>
      <nav className="flex flex-col gap-1 text-sm">
        <Link href="/docs/bat-dau" className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-fd-accent">
          <Rocket className="size-4" />
          Bắt đầu
        </Link>
        <Link href="/docs/tham-chieu-chung/thuat-ngu" className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-fd-accent">
          <BookOpenText className="size-4" />
          Thuật ngữ
        </Link>
        <Link href="/docs/tham-chieu-chung/cam-ket-sla" className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-fd-accent">
          <Gauge className="size-4" />
          Cam kết SLA
        </Link>
        <Link href="/docs/tham-chieu-chung/cau-hoi-thuong-gap" className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-fd-accent">
          <CircleHelp className="size-4" />
          Câu hỏi thường gặp
        </Link>
      </nav>
    </div>
  );
}

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      tabs={false}
      slots={{
        container: DocsContainer,
        header: TopNav,
      }}
      sidebar={{
        defaultOpenLevel: 1,
        footer: <SharedDocsNavigation />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
