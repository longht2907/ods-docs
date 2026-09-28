import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Cloud,
  Headphones,
  KeyRound,
  Layers3,
  LifeBuoy,
  Newspaper,
  PhoneCall,
  Server,
  Wrench,
} from 'lucide-react';
import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import {
  docsProducts,
  odsExternalLinks,
  type DocsProductEntryIcon,
} from '@/lib/docs-products';
import { getHomeContentModel } from '@/lib/home-content';
import {
  odsSolutionGroups,
  type OdsSolutionIcon,
} from '@/lib/ods-solutions';
import { gitConfig } from '@/lib/shared';

const solutionIcons: Record<OdsSolutionIcon, LucideIcon> = {
  phone: PhoneCall,
  cloud: Cloud,
  server: Server,
  managed: Wrench,
  license: KeyRound,
};

const entryIcons: Record<DocsProductEntryIcon, LucideIcon> = {
  guide: BookOpen,
  api: Braces,
};

export default function HomePage() {
  const content = getHomeContentModel();

  const groupsWithDocs = odsSolutionGroups.filter((group) =>
    group.products.some((product) => product.docsSlug),
  );

  const groupsWithoutDocs = odsSolutionGroups.filter(
    (group) => !group.products.some((product) => product.docsSlug),
  );

  return (
    <main className="ods-home-page bg-fd-background text-fd-foreground">
      {/* 1. HERO */}
      <section className="ods-hero-section relative isolate overflow-hidden px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:px-12">
        <div className="ods-hero-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[450px]" />
        
        <div className="mx-auto flex max-w-[1120px] flex-col items-center text-center">
          <p className="ods-section-label">Trung tâm tài liệu ODS</p>

          <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Tài liệu sản phẩm ODS
          </h1>

          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-fd-muted-foreground sm:text-lg">
            Hướng dẫn sử dụng và tài liệu tích hợp chính thức cho các giải pháp ODS cung cấp cho doanh nghiệp.
          </p>

          <div className="mt-8 w-full max-w-[620px]">
            <FullSearchTrigger
              hideIfDisabled
              className="h-14 w-full rounded-xl border border-fd-border/80 bg-fd-card px-4 text-left shadow-sm backdrop-blur transition-all hover:border-orange-500/40 hover:bg-fd-accent/50"
            />
            <div
              className="mt-3 flex flex-wrap items-center justify-center gap-2"
              aria-label="Gợi ý tìm kiếm phổ biến"
            >
              <span className="text-xs font-medium text-fd-muted-foreground">Phổ biến:</span>
              {content.searchSuggestions.map((suggestion) => (
                <Link
                  key={suggestion.href}
                  href={suggestion.href}
                  className="ods-search-suggestion"
                >
                  {suggestion.label} <ArrowRight aria-hidden="true" className="size-3" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. DẢI GIỚI THIỆU ODS */}
      <section className="ods-intro-strip border-y border-zinc-800 bg-zinc-900 text-zinc-100 dark:border-zinc-800/80 dark:bg-zinc-950">
        <div className="mx-auto flex min-h-[80px] max-w-[1120px] flex-col justify-between gap-4 px-5 py-4 sm:px-8 min-[1100px]:flex-row min-[1100px]:items-center lg:px-12">
          {/* Trái */}
          <div className="shrink-0">
            <p className="text-sm font-semibold tracking-tight text-white">
              ODS — Hạ tầng số · Cloud · AI
            </p>
            <p className="text-xs text-zinc-400">
              5 nhóm giải pháp cho doanh nghiệp
            </p>
          </div>

          {/* Giữa: Chip các nhóm giải pháp */}
          <div className="flex flex-wrap items-center gap-2">
            {odsSolutionGroups.map((group) => {
              const Icon = solutionIcons[group.icon];
              const hasDocs = group.products.some((product) => product.docsSlug);

              return (
                <a
                  key={group.id}
                  href={group.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    hasDocs
                      ? 'ods-solution-chip ods-solution-chip-accent'
                      : 'ods-solution-chip ods-solution-chip-muted'
                  }
                  title={`Xem giải pháp ${group.title} trên ods.vn`}
                >
                  <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>{group.title}</span>
                </a>
              );
            })}
          </div>

          {/* Phải */}
          <div className="shrink-0">
            <a
              href={odsExternalLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-300 transition-colors hover:text-white"
            >
              Tìm hiểu ODS <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. DANH MỤC SẢN PHẨM */}
      <section id="san-pham" className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 scroll-mt-12">
        {/* Header danh mục */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="ods-section-label">Sản phẩm</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Chọn sản phẩm để mở tài liệu
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs text-fd-muted-foreground" aria-label="Chú giải trạng thái tài liệu">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-orange-500" aria-hidden="true" />
              Có tài liệu
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full border border-fd-muted-foreground/60" aria-hidden="true" />
              Xem giới thiệu trên ods.vn
            </span>
          </div>
        </div>

        {/* Danh sách nhóm giải pháp */}
        <div className="mt-10 space-y-12">
          {groupsWithDocs.map((group) => {
            const GroupIcon = solutionIcons[group.icon];
            const documentedProducts = group.products.filter((p) => p.docsSlug);
            const undocumentedProducts = group.products.filter((p) => !p.docsSlug);

            return (
              <div
                key={group.id}
                className="ods-solution-row grid grid-cols-1 gap-6 border-t border-fd-border/70 pt-8 min-[900px]:grid-cols-[240px_1fr] min-[900px]:gap-10"
              >
                {/* Cột trái: Nhóm giải pháp */}
                <div>
                  <div className="flex items-center gap-2.5 text-fd-foreground font-semibold">
                    <span className="grid size-7 place-items-center rounded-lg bg-fd-muted text-fd-muted-foreground">
                      <GroupIcon className="size-4" aria-hidden="true" />
                    </span>
                    <h3 className="text-base font-semibold">{group.title}</h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-fd-muted-foreground">
                    {group.description}
                  </p>
                </div>

                {/* Cột phải: Card sản phẩm có tài liệu */}
                <div className="space-y-6">
                  {documentedProducts.map((p) => {
                    const product = docsProducts.find((dp) => dp.slug === p.docsSlug);
                    if (!product) return null;

                    const ProductIcon = solutionIcons[product.icon];

                    return (
                      <article
                        key={product.slug}
                        className="ods-product-card"
                        data-product-accent={product.accent}
                      >
                        {/* Header card sản phẩm */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="ods-product-mark">
                              <ProductIcon className="size-5" aria-hidden="true" />
                            </span>
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-wider text-fd-muted-foreground">
                                {product.category}
                              </p>
                              <h4 className="text-lg font-bold tracking-tight text-fd-foreground">
                                {product.name}
                              </h4>
                            </div>
                          </div>
                          <a
                            href={product.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ods-external-link"
                          >
                            Giới thiệu <ArrowUpRight className="size-3.5" aria-hidden="true" />
                          </a>
                        </div>

                        {/* Mô tả sản phẩm */}
                        <p className="mt-3 text-sm leading-relaxed text-fd-muted-foreground">
                          {product.description}
                        </p>

                        {/* Entry links */}
                        <div
                          className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
                          aria-label={`Lối vào tài liệu ${product.name}`}
                        >
                          {product.entries.map((entry) => {
                            const EntryIcon = entryIcons[entry.icon];

                            return (
                              <Link
                                key={entry.href}
                                href={entry.href}
                                className="ods-entry-card group"
                              >
                                <span className="ods-entry-icon">
                                  <EntryIcon className="size-4" aria-hidden="true" />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block text-sm font-semibold text-fd-foreground group-hover:text-fd-primary">
                                    {entry.label}
                                  </span>
                                  {entry.description && (
                                    <span className="block text-xs text-fd-muted-foreground">
                                      {entry.description}
                                    </span>
                                  )}
                                </span>
                                <ArrowRight
                                  className="size-4 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-fd-foreground"
                                  aria-hidden="true"
                                />
                              </Link>
                            );
                          })}
                        </div>
                      </article>
                    );
                  })}

                  {/* Sản phẩm cùng nhóm chưa có tài liệu */}
                  {undocumentedProducts.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                      <span className="font-medium text-fd-muted-foreground">Cùng nhóm:</span>
                      {undocumentedProducts.map((prod) => (
                        <a
                          key={prod.name}
                          href={prod.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ods-dashed-chip"
                        >
                          {prod.name} <ArrowUpRight className="size-3" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Hàng cuối: Giải pháp khác (chưa có tài liệu) */}
          {groupsWithoutDocs.length > 0 && (
            <div className="ods-solution-row grid grid-cols-1 gap-6 border-t border-fd-border/70 pt-8 min-[900px]:grid-cols-[240px_1fr] min-[900px]:gap-10">
              <div>
                <div className="flex items-center gap-2.5 text-fd-foreground font-semibold">
                  <span className="grid size-7 place-items-center rounded-lg bg-fd-muted text-fd-muted-foreground">
                    <Layers3 className="size-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold">Giải pháp khác</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-fd-muted-foreground">
                  Chưa có tài liệu trên site
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {groupsWithoutDocs.map((group) => {
                  const GroupIcon = solutionIcons[group.icon];

                  return (
                    <a
                      key={group.id}
                      href={group.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ods-dashed-chip ods-dashed-chip-group"
                    >
                      <GroupIcon className="size-3.5 text-fd-muted-foreground" aria-hidden="true" />
                      <span>{group.title}</span>
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. HỖ TRỢ */}
      <section className="border-t border-fd-border/70 bg-fd-card/30">
        <div className="mx-auto max-w-[1120px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <a
              href={odsExternalLinks.support}
              target="_blank"
              rel="noopener noreferrer"
              className="ods-support-card group"
            >
              <span className="ods-support-icon">
                <Headphones className="size-5" aria-hidden="true" />
              </span>
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-fd-foreground group-hover:text-orange-600 dark:group-hover:text-orange-500">
                    Support Portal
                  </h3>
                  <ArrowUpRight className="size-4 text-fd-muted-foreground group-hover:text-fd-foreground" aria-hidden="true" />
                </div>
                <p className="mt-1 text-xs leading-relaxed text-fd-muted-foreground">
                  Gửi yêu cầu và tra cứu tiến độ xử lý sự cố kỹ thuật 24/7.
                </p>
              </div>
            </a>

            <a
              href={odsExternalLinks.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="ods-support-card group"
            >
              <span className="ods-support-icon">
                <Newspaper className="size-5" aria-hidden="true" />
              </span>
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-fd-foreground group-hover:text-orange-600 dark:group-hover:text-orange-500">
                    Kiến thức (Blog)
                  </h3>
                  <ArrowUpRight className="size-4 text-fd-muted-foreground group-hover:text-fd-foreground" aria-hidden="true" />
                </div>
                <p className="mt-1 text-xs leading-relaxed text-fd-muted-foreground">
                  Bài viết chuyên sâu, cẩm nang công nghệ và tin tức từ ODS.
                </p>
              </div>
            </a>

            <a
              href={odsExternalLinks.contact}
              target="_blank"
              rel="noopener noreferrer"
              className="ods-support-card group"
            >
              <span className="ods-support-icon">
                <LifeBuoy className="size-5" aria-hidden="true" />
              </span>
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-fd-foreground group-hover:text-orange-600 dark:group-hover:text-orange-500">
                    Liên hệ tư vấn
                  </h3>
                  <ArrowUpRight className="size-4 text-fd-muted-foreground group-hover:text-fd-foreground" aria-hidden="true" />
                </div>
                <p className="mt-1 text-xs leading-relaxed text-fd-muted-foreground">
                  Trao đổi với đội ngũ chuyên gia ODS về giải pháp cho doanh nghiệp.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 5. FOOTER 1 DÒNG */}
      <footer className="border-t border-fd-border/70">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-5 py-6 text-xs text-fd-muted-foreground sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} Công ty Cổ phần ODS</p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={odsExternalLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-fd-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
            >
              Website ODS
            </a>
            <span aria-hidden="true" className="text-fd-border">·</span>
            <a
              href={odsExternalLinks.identity}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-fd-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
            >
              ODS ID
            </a>
            <span aria-hidden="true" className="text-fd-border">·</span>
            <a
              href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-fd-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
