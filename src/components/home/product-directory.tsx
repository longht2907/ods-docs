'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Cloud,
  Headphones,
  HelpCircle,
  KeyRound,
  Layers3,
  PhoneCall,
  Server,
  Sparkles,
  Wrench,
} from 'lucide-react';
import {
  docsProducts,
  odsExternalLinks,
  type DocsProduct,
  type DocsProductEntryIcon,
} from '@/lib/docs-products';
import {
  odsSolutionGroups,
  type OdsSolutionGroup,
  type OdsSolutionIcon,
} from '@/lib/ods-solutions';

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

export function ProductDirectory() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Lọc sản phẩm theo danh mục giải pháp
  const filteredProducts =
    activeFilter === 'all'
      ? docsProducts
      : docsProducts.filter((p) => {
          const group = odsSolutionGroups.find((g) => g.id === activeFilter);
          return group?.products.some((gp) => gp.docsSlug === p.slug);
        });

  const selectedGroup =
    activeFilter !== 'all'
      ? odsSolutionGroups.find((g) => g.id === activeFilter)
      : null;

  return (
    <section id="san-pham" className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 scroll-mt-12">
      {/* 1. Header danh mục */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2">
            <span className="grid size-5 place-items-center rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <BookOpen className="size-3.5" aria-hidden="true" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">
              Trung tâm tài liệu sản phẩm
            </p>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-fd-foreground sm:text-3xl">
            Chọn không gian tài liệu để bắt đầu
          </h2>
          <p className="mt-2 text-sm text-fd-muted-foreground">
            Truy cập hướng dẫn sử dụng, cẩm nang vận hành và tài liệu API chính thức cho các giải pháp ODS.
          </p>
        </div>

        {/* Chú giải trạng thái */}
        <div className="flex items-center gap-4 text-xs text-fd-muted-foreground" aria-label="Chú giải trạng thái tài liệu">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-orange-500" aria-hidden="true" />
            Đã có tài liệu
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full border border-fd-muted-foreground/60" aria-hidden="true" />
            Xem trên ods.vn
          </span>
        </div>
      </div>

      {/* 2. Quick Category Filter Bar */}
      <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-fd-border/70 pb-4">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
            activeFilter === 'all'
              ? 'bg-fd-foreground text-fd-background shadow-sm'
              : 'border border-fd-border/80 bg-fd-card/70 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground'
          }`}
        >
          <Layers3 className="size-3.5" aria-hidden="true" />
          Tất cả tài liệu ({docsProducts.length})
        </button>

        {odsSolutionGroups.map((group) => {
          const Icon = solutionIcons[group.icon];
          const hasDocs = group.products.some((p) => p.docsSlug);
          const isSelected = activeFilter === group.id;

          return (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveFilter(group.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'border border-fd-border/80 bg-fd-card/70 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground'
              }`}
            >
              <Icon className="size-3.5" aria-hidden="true" />
              <span>{group.title}</span>
              {hasDocs && !isSelected && (
                <span className="size-1.5 rounded-full bg-orange-500" title="Có tài liệu" />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Product Cards Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredProducts.map((product) => {
          const ProductIcon = solutionIcons[product.icon];

          return (
            <article
              key={product.slug}
              className="ods-product-card group relative flex flex-col justify-between rounded-2xl border border-fd-border/80 bg-fd-card/70 p-6 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-fd-border hover:shadow-xl"
              data-product-accent={product.accent}
            >
              <div>
                {/* Header Card: Icon + Category + Name + Link ngoài */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className="ods-product-mark">
                      <ProductIcon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-fd-muted-foreground">
                          {product.category}
                        </span>
                        <span className="rounded-md border border-orange-500/20 bg-orange-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-orange-600 dark:text-orange-400">
                          Chính thức
                        </span>
                      </div>
                      <h3 className="mt-0.5 text-xl font-bold tracking-tight text-fd-foreground">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-fd-border/60 bg-fd-background/60 px-2.5 py-1 text-xs font-semibold text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
                    title={`Xem giới thiệu ${product.name} trên ods.vn`}
                  >
                    Giới thiệu <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </div>

                {/* Mô tả sản phẩm */}
                <p className="mt-4 text-sm leading-relaxed text-fd-muted-foreground">
                  {product.description}
                </p>

                {/* Capabilities pills */}
                {product.capabilities.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {product.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="inline-flex items-center rounded-md bg-fd-muted/60 px-2 py-0.5 text-[11px] font-medium text-fd-foreground/80"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                )}

                {/* Entry Links Grid */}
                <div className="mt-6 border-t border-fd-border/60 pt-4">
                  <p className="text-xs font-semibold text-fd-muted-foreground">
                    Lối vào tài liệu trực tiếp:
                  </p>
                  <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {product.entries.map((entry) => {
                      const EntryIcon = entryIcons[entry.icon];

                      return (
                        <Link
                          key={entry.href}
                          href={entry.href}
                          className="ods-entry-card group/entry flex items-center gap-3 rounded-xl border border-fd-border/70 bg-fd-background/80 p-3 transition-all hover:border-fd-primary hover:bg-fd-accent"
                        >
                          <span className="ods-entry-icon grid size-8 shrink-0 place-items-center rounded-lg bg-fd-muted text-fd-foreground transition-colors group-hover/entry:bg-fd-primary/10 group-hover/entry:text-fd-primary">
                            <EntryIcon className="size-4" aria-hidden="true" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <strong className="block text-xs font-bold text-fd-foreground group-hover/entry:text-fd-primary">
                              {entry.label}
                            </strong>
                            {entry.description && (
                              <small className="block text-[11px] text-fd-muted-foreground">
                                {entry.description}
                              </small>
                            )}
                          </span>
                          <ArrowRight
                            className="size-3.5 text-fd-muted-foreground transition-transform group-hover/entry:translate-x-0.5 group-hover/entry:text-fd-foreground"
                            aria-hidden="true"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Bottom */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-fd-border/60">
                <Link
                  href={product.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
                >
                  Mở toàn bộ tài liệu {product.shortName} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}

        {/* Thẻ chờ tài liệu mới & Yêu cầu giải pháp khác */}
        {activeFilter === 'all' && (
          <article className="relative flex flex-col justify-between rounded-2xl border-2 border-dashed border-fd-border/80 bg-fd-card/30 p-6 backdrop-blur">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl border border-fd-border bg-fd-background text-fd-muted-foreground">
                  <Sparkles className="size-5 text-amber-500" aria-hidden="true" />
                </span>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-fd-muted-foreground">
                    Hệ sinh thái mở rộng
                  </span>
                  <h3 className="text-lg font-bold text-fd-foreground">
                    Cần tài liệu cho giải pháp khác?
                  </h3>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-fd-muted-foreground">
                Tài liệu kỹ thuật cho các nhóm giải pháp <strong>Datacenter</strong>, <strong>Managed Services</strong> và <strong>License</strong> đang được cập nhật liên tục. Doanh nghiệp có thể tra cứu thông tin trên ods.vn hoặc liên hệ đội ngũ ODS.
              </p>

              <div className="mt-5">
                <p className="text-xs font-semibold text-fd-muted-foreground">
                  Tham khảo nhanh trên ods.vn:
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <a
                    href="https://ods.vn/cho-dat-may-chu-da-dich-vu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ods-dashed-chip text-xs"
                  >
                    Colocation &amp; Server ↗
                  </a>
                  <a
                    href="https://ods.vn/dich-vu-quan-tri-may-chu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ods-dashed-chip text-xs"
                  >
                    Server Management ↗
                  </a>
                  <a
                    href="https://ods.vn/ban-quyen-microsoft"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ods-dashed-chip text-xs"
                  >
                    Microsoft SPLA ↗
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-fd-border/60 pt-4">
              <a
                href={odsExternalLinks.support}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-fd-muted-foreground hover:text-fd-foreground"
              >
                <HelpCircle className="size-3.5" aria-hidden="true" />
                Gửi yêu cầu tài liệu tới Support Portal ↗
              </a>
            </div>
          </article>
        )}

        {/* Trường hợp chọn 1 nhóm chưa có tài liệu */}
        {selectedGroup && filteredProducts.length === 0 && (
          <article className="col-span-full rounded-2xl border border-fd-border bg-fd-card/60 p-8 text-center backdrop-blur">
            <span className="mx-auto grid size-12 place-items-center rounded-xl bg-fd-muted text-fd-muted-foreground">
              <Sparkles className="size-6 text-amber-500" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-xl font-bold text-fd-foreground">
              Tài liệu cho {selectedGroup.title} đang được hoàn thiện
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-fd-muted-foreground">
              {selectedGroup.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={selectedGroup.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-fd-primary px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground shadow transition-transform hover:scale-105"
              >
                Xem chi tiết giải pháp trên ods.vn <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className="inline-flex items-center gap-1.5 rounded-xl border border-fd-border bg-fd-background px-4 py-2.5 text-sm font-semibold text-fd-muted-foreground hover:text-fd-foreground"
              >
                Quay lại tất cả tài liệu
              </button>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
