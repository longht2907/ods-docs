import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BookOpen,
  Braces,
  Cloud,
  KeyRound,
  PhoneCall,
  Server,
  Wrench,
} from 'lucide-react';
import { docsProducts, type DocsProductIcon } from '@/lib/docs-products';

const productIcons: Record<DocsProductIcon, LucideIcon> = {
  phone: PhoneCall,
  cloud: Cloud,
  server: Server,
  managed: Wrench,
  license: KeyRound,
};

const sectionIcons = {
  'book-open': BookOpen,
  braces: Braces,
} as const satisfies Record<(typeof docsProducts)[number]['sections'][number]['icon'], LucideIcon>;

export function DocsProductDirectory() {
  return (
    <section className="not-prose mt-8" aria-labelledby="docs-product-directory-title">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fd-primary">
          Tài liệu theo sản phẩm
        </p>
        <h2 id="docs-product-directory-title" className="mt-2 text-2xl font-semibold tracking-tight">
          Chọn không gian tài liệu
        </h2>
        <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">
          Mỗi không gian có cây nội dung riêng để bạn tập trung vào đúng sản phẩm và tác vụ.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {docsProducts.map((product) => {
          const ProductIcon = productIcons[product.icon];

          return (
            <article
              key={product.slug}
              className="flex min-h-64 flex-col rounded-2xl border border-fd-border/80 bg-fd-card/45 p-5 transition-colors hover:border-fd-primary/40"
            >
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-fd-primary/10 text-fd-primary">
                  <ProductIcon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-fd-muted-foreground">{product.category}</p>
                  <h3 className="mt-1 text-lg font-semibold">{product.name}</h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-fd-muted-foreground">{product.description}</p>

              <div className="mt-4 flex flex-wrap gap-2" aria-label={`Các vùng tài liệu của ${product.name}`}>
                {product.sections.map((section) => {
                  const SectionIcon = sectionIcons[section.icon];
                  return (
                    <Link
                      key={`${section.kind}-${section.href}`}
                      href={section.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-fd-border bg-fd-background px-2.5 py-1 text-xs font-medium hover:border-fd-primary/40 hover:text-fd-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
                    >
                      <SectionIcon className="size-3" />
                      {section.title}
                    </Link>
                  );
                })}
              </div>

              <Link
                href={product.href}
                className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-fd-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
              >
                Mở tài liệu <ArrowRight className="size-4" />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
