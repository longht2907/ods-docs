import Link from 'next/link';
import { internalSource } from '@/lib/source';
import { ArrowRight } from 'lucide-react';

interface AutoIndexProps {
  currentUrl?: string;
  root?: string;
  filter?: string;
  emptyText?: string;
}

export function AutoIndex({
  currentUrl,
  root,
  filter,
  emptyText = 'Chưa có bài viết con trong mục này.',
}: AutoIndexProps) {
  const targetPath = (root || currentUrl || '').replace(/\/+$/, '');
  if (!targetPath) return null;

  const allPages = internalSource.getPages();

  // Tìm các trang con trực tiếp (cách 1 cấp)
  const childPages = allPages.filter((p) => {
    const url = p.url.replace(/\/+$/, '');
    if (url === targetPath) return false;
    if (!url.startsWith(targetPath + '/')) return false;

    // Chỉ lấy con trực tiếp (không lấy cháu chắt)
    const relative = url.slice(targetPath.length + 1);
    if (relative.includes('/')) return false;

    // Lọc theo từ khóa nếu có
    if (
      filter &&
      !url.includes(filter) &&
      !p.data.title.toLowerCase().includes(filter.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  if (childPages.length === 0) {
    return (
      <div className="not-prose my-4 rounded-xl border border-dashed border-fd-border/80 bg-fd-muted/20 p-6 text-center text-sm text-fd-muted-foreground">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
      {childPages.map((page) => (
        <Link
          key={page.url}
          href={page.url}
          className="group flex flex-col justify-between rounded-xl border border-fd-border/70 bg-fd-card/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-fd-primary/50 hover:bg-fd-accent/30 hover:shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-fd-foreground group-hover:text-fd-primary">
                {page.data.title}
              </h3>
              <ArrowRight className="size-4 shrink-0 text-fd-muted-foreground/60 transition-transform group-hover:translate-x-1 group-hover:text-fd-primary" />
            </div>
            {page.data.description && (
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fd-muted-foreground">
                {page.data.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
