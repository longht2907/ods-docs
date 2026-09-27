import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  GitBranch,
  Globe2,
  Headphones,
  LifeBuoy,
  Newspaper,
} from 'lucide-react';
import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { ProductDocsDirectory } from '@/components/home/product-docs-directory';
import { RoleGuides } from '@/components/home/role-guides';
import { SolutionMap } from '@/components/home/solution-map';
import { docsProducts, odsExternalLinks } from '@/lib/docs-products';
import { getHomeContentModel } from '@/lib/home-content';
import { gitConfig } from '@/lib/shared';

export default function HomePage() {
  const content = getHomeContentModel();

  return (
    <main className="ods-home-page relative isolate overflow-hidden bg-fd-background text-fd-foreground">
      <div className="ods-home-aurora pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]" />

      {/* 1. Hero */}
      <section className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:gap-14 lg:px-12 lg:pb-24">
        <div className="relative z-10 min-w-0">
          <p className="ods-section-label">ODS Documentation</p>

          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-bold tracking-[-0.045em] sm:text-5xl lg:text-[3.65rem] lg:leading-[1.02]">
            Trung tâm tài liệu{' '}
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-sky-700 bg-clip-text text-transparent dark:from-orange-500 dark:via-amber-400 dark:to-sky-400">
              ODS
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-fd-muted-foreground sm:text-lg">
            Nơi khách hàng ODS tra cứu hướng dẫn sử dụng, quy trình vận hành, API và tài liệu
            tích hợp cho các sản phẩm, dịch vụ ODS.
          </p>

          <div className="ods-audience-list" aria-label="Đối tượng sử dụng tài liệu">
            {content.roleGroups.map((group) => <span key={group.id}>{group.label}</span>)}
          </div>

          <div className="mt-8 max-w-2xl">
            <FullSearchTrigger
              hideIfDisabled
              className="h-16 w-full rounded-2xl border border-fd-border/90 bg-fd-card/90 px-5 text-left shadow-xl shadow-black/5 backdrop-blur transition-colors hover:border-orange-500/45 hover:bg-fd-accent"
            />
            <div className="mt-3 flex flex-wrap items-center gap-2" aria-label="Gợi ý tài liệu">
              <span className="mr-1 text-xs text-fd-muted-foreground">Thử tìm:</span>
              {content.searchSuggestions.map((suggestion) => (
                <Link key={suggestion.href} href={suggestion.href} className="ods-search-suggestion">
                  {suggestion.label} <ArrowRight aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <a href="#tai-lieu-san-pham" className="ods-button ods-button-primary">
              Chọn sản phẩm <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <SolutionMap />
      </section>

      {/* 2. Product documentation */}
      <section
        id="tai-lieu-san-pham"
        className="ods-reveal border-y border-fd-border/70 bg-fd-card/20 scroll-mt-20"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="max-w-3xl">
            <p className="ods-section-label">Tài liệu theo sản phẩm</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Chọn sản phẩm để bắt đầu
            </h2>
            <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
              Mở hướng dẫn sử dụng, tài liệu API và quy trình vận hành dành cho sản phẩm
              doanh nghiệp của bạn đang sử dụng.
            </p>
          </div>

          <ProductDocsDirectory products={content.products} />
        </div>
      </section>

      {/* 3. Role-based start */}
      <section className="ods-role-section ods-reveal">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="max-w-3xl">
            <p className="ods-section-label">Tìm theo công việc</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Hướng dẫn phù hợp với vai trò của bạn
            </h2>
            <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
              Đi thẳng tới các tác vụ thường dùng dành cho quản trị viên, Developer,
              Agent và giám sát viên phía khách hàng.
            </p>
          </div>
          <RoleGuides groups={content.roleGroups} />
        </div>
      </section>

      {/* 4. Support */}
      <section className="ods-reveal mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="ods-support-strip">
          <div>
            <span>Kiến thức &amp; Hỗ trợ</span>
            <h2>Bạn cần thêm trợ giúp?</h2>
            <p>
              Tìm kinh nghiệm triển khai, gửi yêu cầu hỗ trợ hoặc trao đổi trực tiếp với
              đội ngũ ODS.
            </p>
          </div>
          <nav aria-label="Kênh kiến thức và hỗ trợ">
            <a href={odsExternalLinks.blog} target="_blank" rel="noopener noreferrer">
              <Newspaper aria-hidden="true" /> Đọc kiến thức <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={odsExternalLinks.support} target="_blank" rel="noopener noreferrer">
              <Headphones aria-hidden="true" /> Gửi yêu cầu hỗ trợ <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={odsExternalLinks.contact} target="_blank" rel="noopener noreferrer">
              <LifeBuoy aria-hidden="true" /> Liên hệ ODS <ArrowUpRight aria-hidden="true" />
            </a>
          </nav>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="ods-footer border-t border-fd-border/70">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
          <div className="ods-footer-brand">
            <Link href="/">ODS Docs</Link>
            <p>Trung tâm tài liệu dành cho khách hàng sử dụng sản phẩm và dịch vụ ODS.</p>
          </div>
          <div className="ods-footer-grid">
            <div>
              <h2>Sản phẩm</h2>
              {docsProducts.map((product) => (
                <Link key={product.slug} href={product.href}>{product.name}</Link>
              ))}
            </div>
            <div>
              <h2>Tài liệu</h2>
              <Link href="/docs">Danh mục tài liệu</Link>
              <Link href="/docs/ai-contact-center/user-guider-portal">Hướng dẫn Portal</Link>
              <Link href="/docs/ai-contact-center/api">API Reference</Link>
            </div>
            <div>
              <h2>Hỗ trợ</h2>
              <a href={odsExternalLinks.blog} target="_blank" rel="noopener noreferrer">Blog ODS</a>
              <a href={odsExternalLinks.support} target="_blank" rel="noopener noreferrer">Support Portal</a>
              <a href={odsExternalLinks.contact} target="_blank" rel="noopener noreferrer">Liên hệ ODS</a>
            </div>
            <div>
              <h2>ODS</h2>
              <a href={odsExternalLinks.website} target="_blank" rel="noopener noreferrer">
                <Globe2 aria-hidden="true" /> Website ODS
              </a>
              <a href={odsExternalLinks.identity} target="_blank" rel="noopener noreferrer">ODS ID</a>
              <a
                href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitBranch aria-hidden="true" /> GitHub
              </a>
            </div>
          </div>
          <div className="ods-footer-bottom">
            <p>© {new Date().getFullYear()} Công ty Cổ phần ODS</p>
            <span>Hạ tầng số · Cloud · AI</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
