import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Check,
  Cloud,
  Code2,
  ExternalLink,
  FileCheck2,
  GitBranch,
  Globe2,
  Headphones,
  KeyRound,
  LifeBuoy,
  Newspaper,
  PhoneCall,
  Server,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { HeroPreview } from '@/components/home/hero-preview';
import { RoleGuides } from '@/components/home/role-guides';
import { docsProducts, odsExternalLinks } from '@/lib/docs-products';
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

const apiSnippet = `curl -X POST https://api.ods.vn/v1/calls/make \\
  -H "Authorization: Bearer <YOUR_API_TOKEN>"`;

export default function HomePage() {
  const content = getHomeContentModel();
  const metrics = [
    {
      value: String(content.portalChapters.length),
      label: 'chương Portal',
      detail: 'Lộ trình quản trị hoàn chỉnh',
    },
    {
      value: 'REST',
      label: content.apiCapability,
      detail: 'Sẵn sàng cho tích hợp',
    },
    {
      value: String(content.documentedProductCount),
      label: 'sản phẩm có tài liệu',
      detail: 'Được mở rộng liên tục',
    },
    {
      value: '24/7',
      label: 'hỗ trợ kỹ thuật',
      detail: 'Đồng hành khi vận hành',
    },
  ] as const;

  return (
    <main className="ods-home-page relative isolate overflow-hidden bg-fd-background text-fd-foreground">
      <div className="ods-home-aurora pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]" />

      {/* 1. Hero */}
      <section className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-12 px-5 pb-14 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16 lg:px-12 lg:pb-20">
        <div className="relative z-10 min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-fd-border/80 bg-fd-card/75 px-3 py-1.5 text-xs font-semibold text-fd-muted-foreground shadow-sm backdrop-blur">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Trung tâm tài liệu chính thức của ODS
          </div>

          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-bold tracking-[-0.045em] sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
            Một nơi để triển khai, vận hành và{' '}
            <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-sky-700 bg-clip-text text-transparent dark:from-orange-500 dark:via-amber-400 dark:to-sky-400">
              tích hợp giải pháp ODS
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-fd-muted-foreground sm:text-lg">
            Tra cứu hướng dẫn kỹ thuật, cẩm nang vận hành và tài liệu tích hợp cho AI
            Contact Center, CloudFile cùng hệ sinh thái Hạ tầng số, Cloud và AI của ODS.
          </p>

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

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#tai-lieu-san-pham" className="ods-button ods-button-primary">
              Chọn sản phẩm <ArrowRight aria-hidden="true" />
            </a>
            <Link href="/docs" className="ods-button ods-button-secondary">
              Xem toàn bộ tài liệu <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <HeroPreview chapters={content.featuredPortalChapters} />
      </section>

      {/* 2. Metrics */}
      <section className="ods-metrics-strip border-y border-fd-border/70" aria-label="Tổng quan nội dung">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
          {metrics.map((metric) => (
            <div key={metric.label} className="ods-metric">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.detail}</small>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Product Bento */}
      <section id="tai-lieu-san-pham" className="ods-reveal mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="ods-section-label">Tài liệu theo sản phẩm</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Thấy ngay thứ bạn có thể làm</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-fd-muted-foreground lg:justify-self-end">
            Không chỉ là một đường dẫn vào sản phẩm. Mỗi không gian cho bạn thấy chương hướng dẫn,
            bề mặt API và tác vụ vận hành trước khi mở tài liệu.
          </p>
        </div>

        <div className="ods-product-bento mt-10">
          <article className="ods-bento-card ods-bento-ai" data-product-accent={content.aiProduct.accent}>
            <div className="ods-bento-heading">
              <span className="ods-product-mark"><PhoneCall aria-hidden="true" /></span>
              <div>
                <p>{content.aiProduct.category}</p>
                <h3>{content.aiProduct.name}</h3>
              </div>
              <a href={content.aiProduct.productUrl} target="_blank" rel="noopener noreferrer">
                Giải pháp <ArrowUpRight aria-hidden="true" />
              </a>
            </div>

            <p className="ods-bento-summary">{content.aiProduct.landingSummary}</p>

            <div className="ods-ai-entry-grid">
              <div className="ods-bento-entry">
                <span className="ods-entry-icon"><BookOpen aria-hidden="true" /></span>
                <div>
                  <span className="ods-entry-kicker">Portal Guide</span>
                  <h4>Đi từ thiết lập đến vận hành</h4>
                </div>
                <ol>
                  {content.featuredPortalChapters.map((chapter, index) => (
                    <li key={chapter.href}>
                      <Link href={chapter.href}>
                        <span>0{index + 1}</span>{chapter.title}<ArrowRight aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ol>
                <Link href="/docs/ai-contact-center/user-guider-portal" className="ods-text-link">
                  Mở hướng dẫn Portal <ArrowRight aria-hidden="true" />
                </Link>
              </div>

              <div className="ods-bento-entry ods-bento-code">
                <span className="ods-entry-icon"><Braces aria-hidden="true" /></span>
                <div>
                  <span className="ods-entry-kicker">API Reference</span>
                  <h4>Kết nối cuộc gọi vào workflow</h4>
                </div>
                <pre><code>{apiSnippet}</code></pre>
                <Link href="/docs/ai-contact-center/api" className="ods-text-link">
                  Xem API Reference <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>

          <article className="ods-bento-card ods-bento-cloud" data-product-accent={content.cloudFileProduct.accent}>
            <div className="ods-bento-heading">
              <span className="ods-product-mark"><Cloud aria-hidden="true" /></span>
              <a href={content.cloudFileProduct.productUrl} target="_blank" rel="noopener noreferrer">
                Giải pháp <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <p className="ods-entry-kicker">{content.cloudFileProduct.category}</p>
            <h3>{content.cloudFileProduct.name}</h3>
            <p className="ods-bento-summary">{content.cloudFileProduct.landingSummary}</p>
            <div className="ods-cloud-flow" aria-label="Luồng sử dụng CloudFile">
              <span><Cloud aria-hidden="true" /> Cloud</span>
              <i aria-hidden="true" />
              <span><FileCheck2 aria-hidden="true" /> Đồng bộ</span>
              <i aria-hidden="true" />
              <span><Check aria-hidden="true" /> Chia sẻ</span>
            </div>
            <ul className="ods-capability-list">
              {content.cloudFileProduct.capabilities.map((capability) => (
                <li key={capability}><Check aria-hidden="true" />{capability}</li>
              ))}
            </ul>
            <Link href={content.cloudFileProduct.href} className="ods-button ods-button-accent">
              Mở tài liệu CloudFile <ArrowRight aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      {/* 4. Role-based start */}
      <section className="ods-role-section ods-reveal border-y border-fd-border/70">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="max-w-3xl">
            <p className="ods-section-label">Bắt đầu theo vai trò</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Một điểm bắt đầu phù hợp với công việc của bạn</h2>
            <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
              Chọn vai trò để mở đúng tác vụ cần làm, không cần đoán tài liệu thuộc sản phẩm hay chương nào.
            </p>
          </div>
          <RoleGuides groups={content.roleGroups} />
        </div>
      </section>

      {/* 5. ODS ecosystem */}
      <section className="ods-reveal mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="ods-section-label">Hệ sinh thái ODS</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Từ tài liệu đến toàn bộ giải pháp số</h2>
            <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
              Sản phẩm có tài liệu được làm nổi bật để đi thẳng vào hướng dẫn. Các giải pháp còn lại mở trang sản phẩm chính thức trên ODS.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-fd-muted-foreground">
              <span className="inline-flex items-center gap-2"><i className="ods-legend-dot is-documented" /> Có tài liệu</span>
              <span className="inline-flex items-center gap-2"><i className="ods-legend-dot" /> Trang giải pháp</span>
            </div>
          </div>

          <div className="ods-ecosystem-map">
            <div className="ods-ecosystem-core">
              <Sparkles aria-hidden="true" />
              <span>ODS</span>
              <small>Hệ sinh thái số</small>
            </div>
            <div className="ods-ecosystem-groups">
              {odsSolutionGroups.map((solution) => {
                const SolutionIcon = solutionIcons[solution.icon];
                const hasDocs = solution.products.some((product) => product.docsSlug);
                return (
                  <article key={solution.id} className={hasDocs ? 'has-documented-product' : undefined}>
                    <div className="ods-ecosystem-group-heading">
                      <span><SolutionIcon aria-hidden="true" /></span>
                      <div><h3>{solution.title}</h3><p>{solution.description}</p></div>
                      <a href={solution.productUrl} target="_blank" rel="noopener noreferrer" aria-label={`Xem giải pháp ${solution.title}`}>
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    </div>
                    <div className="ods-ecosystem-products">
                      {solution.products.map((product) => {
                        if (product.docsSlug) {
                          return (
                            <Link key={product.name} href={`/docs/${product.docsSlug}`} className="is-documented">
                              {product.name}<ArrowRight aria-hidden="true" />
                            </Link>
                          );
                        }
                        return (
                          <a key={product.name} href={product.productUrl} target="_blank" rel="noopener noreferrer">
                            {product.name}<ExternalLink aria-hidden="true" />
                          </a>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Support strip */}
      <section className="ods-reveal mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
        <div className="ods-support-strip">
          <div>
            <span>Kiến thức &amp; Hỗ trợ</span>
            <h2>Không để bạn dừng lại ở một trang tài liệu</h2>
            <p>Đọc kinh nghiệm triển khai hoặc kết nối trực tiếp với đội ngũ ODS khi cần hỗ trợ chuyên sâu.</p>
          </div>
          <nav aria-label="Kênh kiến thức và hỗ trợ">
            <a href={odsExternalLinks.blog} target="_blank" rel="noopener noreferrer"><Newspaper aria-hidden="true" /> Blog<ArrowUpRight aria-hidden="true" /></a>
            <a href={odsExternalLinks.support} target="_blank" rel="noopener noreferrer"><Headphones aria-hidden="true" /> Support<ArrowUpRight aria-hidden="true" /></a>
            <a href={odsExternalLinks.contact} target="_blank" rel="noopener noreferrer"><LifeBuoy aria-hidden="true" /> Liên hệ<ArrowUpRight aria-hidden="true" /></a>
          </nav>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="ods-footer border-t border-fd-border/70">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
          <div className="ods-footer-brand">
            <Link href="/">ODS Docs</Link>
            <p>Trung tâm tri thức để triển khai, vận hành và tích hợp giải pháp ODS.</p>
          </div>
          <div className="ods-footer-grid">
            <div><h2>Sản phẩm</h2>{docsProducts.map((product) => <Link key={product.slug} href={product.href}>{product.name}</Link>)}</div>
            <div><h2>Tài liệu</h2><Link href="/docs">Danh mục tài liệu</Link><Link href="/docs/ai-contact-center/user-guider-portal">Hướng dẫn Portal</Link><Link href="/docs/ai-contact-center/api">API Reference</Link></div>
            <div><h2>Hỗ trợ</h2><a href={odsExternalLinks.blog} target="_blank" rel="noopener noreferrer">Blog ODS</a><a href={odsExternalLinks.support} target="_blank" rel="noopener noreferrer">Support Portal</a><a href={odsExternalLinks.contact} target="_blank" rel="noopener noreferrer">Liên hệ ODS</a></div>
            <div><h2>ODS</h2><a href={odsExternalLinks.website} target="_blank" rel="noopener noreferrer"><Globe2 aria-hidden="true" /> Website ODS</a><a href={odsExternalLinks.identity} target="_blank" rel="noopener noreferrer">ODS ID</a><a href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`} target="_blank" rel="noopener noreferrer"><GitBranch aria-hidden="true" /> GitHub</a></div>
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
