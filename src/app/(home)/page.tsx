import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  ArrowUpRight,
  Cloud,
  Code2,
  Headphones,
  KeyRound,
  LifeBuoy,
  Newspaper,
  PhoneCall,
  Rocket,
  Server,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import {
  docsProducts,
  odsExternalLinks,
  type DocsProductAccent,
  type DocsProductIcon,
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

const solutions: readonly OdsSolutionGroup[] = odsSolutionGroups;

const docsProductIcons: Record<DocsProductIcon, LucideIcon> = {
  phone: PhoneCall,
  cloud: Cloud,
  server: Server,
  shield: ShieldCheck,
};

const productAccentStyles: Record<
  DocsProductAccent,
  { icon: string; glow: string }
> = {
  orange: {
    icon: 'bg-orange-500/10 text-orange-500',
    glow: 'bg-orange-500/10',
  },
  sky: {
    icon: 'bg-sky-500/10 text-sky-500',
    glow: 'bg-sky-500/10',
  },
  violet: {
    icon: 'bg-violet-500/10 text-violet-500',
    glow: 'bg-violet-500/10',
  },
  emerald: {
    icon: 'bg-emerald-500/10 text-emerald-500',
    glow: 'bg-emerald-500/10',
  },
};

const documentationTasks = [
  {
    label: 'Quickstart',
    title: 'Bắt đầu triển khai',
    description: 'Checklist cấu hình ban đầu để đưa dịch vụ vào hoạt động đúng chuẩn.',
    href: '/docs/ai-contact-center/user-guider-portal/01-tong-quan/quickstart',
    icon: Rocket,
  },
  {
    label: 'Operations',
    title: 'Vận hành hệ thống',
    description: 'Quản trị người dùng, cấu hình dịch vụ và theo dõi hoạt động hằng ngày.',
    href: '/docs/ai-contact-center/user-guider-portal',
    icon: Wrench,
  },
  {
    label: 'Developer',
    title: 'Tích hợp API & Webhook',
    description: 'Kết nối giải pháp ODS với CRM, ERP và workflow của doanh nghiệp.',
    href: '/docs/ai-contact-center/api',
    icon: Code2,
  },
  {
    label: 'Support',
    title: 'Khắc phục sự cố',
    description: 'Tạo yêu cầu hỗ trợ và phối hợp cùng kỹ sư ODS khi cần xử lý chuyên sâu.',
    href: odsExternalLinks.support,
    external: true,
    icon: LifeBuoy,
  },
] as const;

const knowledgeAndSupport = [
  {
    label: 'Kiến thức công nghệ',
    title: 'Góc nhìn từ đội ngũ kỹ sư ODS',
    description: 'Kinh nghiệm triển khai Cloud, AI, hạ tầng số và tự động hóa trong thực tế.',
    href: odsExternalLinks.blog,
    action: 'Đọc bài viết',
    icon: Newspaper,
    iconClassName: 'bg-orange-500/10 text-orange-500',
  },
  {
    label: 'Hỗ trợ kỹ thuật',
    title: 'Support Portal 24/7',
    description: 'Gửi ticket, theo dõi tiến độ và làm việc trực tiếp với đội ngũ hỗ trợ ODS.',
    href: odsExternalLinks.support,
    action: 'Mở cổng hỗ trợ',
    icon: Headphones,
    iconClassName: 'bg-sky-500/10 text-sky-500',
  },
  {
    label: 'Tư vấn giải pháp',
    title: 'Kết nối với chuyên gia ODS',
    description: 'Trao đổi về kiến trúc, khảo sát PoC hoặc nhu cầu triển khai dành riêng cho doanh nghiệp.',
    href: odsExternalLinks.contact,
    action: 'Liên hệ ODS',
    icon: PhoneCall,
    iconClassName: 'bg-violet-500/10 text-violet-500',
  },
] as const;

export default function HomePage() {
  return (
    <main className="ods-home-page relative isolate overflow-hidden bg-fd-background text-fd-foreground">
      <div className="ods-home-aurora pointer-events-none absolute inset-x-0 top-0 -z-10 h-[860px]" />

      {/* Hero Section */}
      <section className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-12 px-5 pb-10 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:px-12 lg:pb-12">
        <div className="relative z-10 min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-fd-border/80 bg-fd-card/75 px-3 py-1.5 text-xs font-semibold text-fd-muted-foreground shadow-sm backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Trung tâm tài liệu chính thức của ODS
          </div>

          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-bold tracking-[-0.045em] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.02]">
            Một nơi để triển khai, vận hành và{' '}
            <span className="block bg-gradient-to-r from-orange-500 via-amber-400 to-sky-500 bg-clip-text text-transparent">
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
              className="h-14 w-full rounded-2xl border border-fd-border/90 bg-fd-card/90 px-4 text-left shadow-lg shadow-black/5 backdrop-blur transition-colors hover:border-orange-500/45 hover:bg-fd-accent"
            />
          </div>

          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <a
              href="#tai-lieu-san-pham"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-fd-primary px-5 text-sm font-semibold text-fd-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
            >
              Chọn sản phẩm <ArrowRight className="size-4" />
            </a>
            <Link
              href="/docs"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-fd-border bg-fd-card/75 px-5 text-sm font-semibold transition-colors hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
            >
              Xem toàn bộ tài liệu <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-fd-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Rocket className="size-3.5 text-orange-500" /> Hướng dẫn triển khai
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Wrench className="size-3.5 text-sky-500" /> Cẩm nang vận hành
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Code2 className="size-3.5 text-violet-500" /> API và Webhook
            </span>
          </div>
        </div>

        {/* Orbit Visualization Map */}
        <div className="ods-solution-map" aria-label="Bản đồ hệ sinh thái giải pháp ODS">
          <svg className="ods-orbit-lines" viewBox="0 0 640 540" aria-hidden="true">
            <circle cx="320" cy="270" r="132" />
            <path d="M320 270 L320 72" />
            <path d="M320 270 L535 178" />
            <path d="M320 270 L520 410" />
            <path d="M320 270 L180 455" />
            <path d="M320 270 L92 250" />
          </svg>

          <div className="ods-solution-core">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">Trung tâm</span>
            <strong className="mt-1 text-2xl tracking-tight">ODS</strong>
            <span className="mt-1 text-xs text-fd-muted-foreground">Hệ sinh thái số</span>
          </div>

          <div className="ods-solution-nodes">
            {solutions.map((solution, index) => {
              const SolutionIcon = solutionIcons[solution.icon];
              const href = solution.docsUrl ?? solution.productUrl;
              const external = solution.docsUrl === undefined;

              return (
                <Link
                  key={solution.id}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className={`ods-solution-node ods-solution-node-${index + 1} group`}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-fd-muted text-fd-muted-foreground transition-colors group-hover:bg-orange-500/10 group-hover:text-orange-500">
                    <SolutionIcon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="line-clamp-2 block text-xs leading-tight font-semibold">
                      {solution.title}
                    </strong>
                    <span className="mt-0.5 block truncate text-[10px] text-fd-muted-foreground">
                      {solution.products.slice(0, 2).join(' · ')}
                    </span>
                  </span>
                  {external ? (
                    <ArrowUpRight className="size-4 shrink-0 text-fd-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fd-foreground" />
                  ) : (
                    <ArrowRight className="size-4 shrink-0 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-fd-foreground" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product documentation entry points */}
      <section id="tai-lieu-san-pham" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">
              Tài liệu theo sản phẩm
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Chọn không gian tài liệu
            </h2>
            <p className="mt-3 text-fd-muted-foreground">
              Đi thẳng vào hướng dẫn triển khai, vận hành và tích hợp của từng sản phẩm ODS.
            </p>
          </div>
          <Link href="/docs" className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline">
            Xem toàn bộ tài liệu <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {docsProducts.map((product) => {
            const ProductIcon = docsProductIcons[product.icon];
            const accent = productAccentStyles[product.accent];

            return (
              <article key={product.slug} className="ods-product-space-card group relative flex h-full flex-col overflow-hidden">
                <div className={`pointer-events-none absolute -right-12 -top-20 size-52 rounded-full blur-3xl ${accent.glow}`} />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className={`grid size-11 place-items-center rounded-2xl ${accent.icon}`}>
                      <ProductIcon className="size-5" />
                    </div>
                    <a
                      href={product.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-fd-muted-foreground transition-colors hover:text-fd-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
                    >
                      Xem giải pháp <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-fd-muted-foreground">
                    {product.category}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight">{product.name}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-fd-muted-foreground">
                    {product.landingSummary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2" aria-label={`Năng lực chính của ${product.name}`}>
                    {product.capabilities.map((capability) => (
                      <span key={capability} className="ods-chip text-xs text-fd-muted-foreground">
                        {capability}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                    <Link
                      href={product.href}
                      className="inline-flex h-10 items-center gap-2 rounded-xl bg-fd-primary px-4 text-sm font-semibold text-fd-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
                    >
                      Mở tài liệu <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </section>

      {/* Task-oriented documentation launcher */}
      <section className="border-y border-fd-border/70 bg-fd-card/30 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-9 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">
                Tìm theo nhu cầu
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Bạn cần làm gì?
              </h2>
              <p className="mt-4 text-sm leading-6 text-fd-muted-foreground">
                Bắt đầu từ tác vụ thực tế, kể cả khi bạn chưa biết tài liệu nằm trong sản phẩm nào.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {documentationTasks.map((item) => {
                const TaskIcon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    target={'external' in item && item.external ? '_blank' : undefined}
                    rel={'external' in item && item.external ? 'noopener noreferrer' : undefined}
                    className="group flex min-h-36 flex-col rounded-2xl border border-fd-border/80 bg-fd-background p-5 transition-all hover:-translate-y-0.5 hover:border-orange-500/35 hover:shadow-lg hover:shadow-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
                  >
                    <div className="flex items-center justify-between">
                      <TaskIcon className="size-5 text-orange-500" />
                      {'external' in item && item.external ? (
                        <ArrowUpRight className="size-4 text-fd-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      ) : (
                        <ArrowRight className="size-4 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      )}
                    </div>
                    <span className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-fd-muted-foreground">
                      {item.label}
                    </span>
                    <h3 className="mt-1 font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-5 text-fd-muted-foreground">{item.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge and support */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">
            Kiến thức &amp; Hỗ trợ
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Đồng hành ngoài trang tài liệu</h2>
          <p className="mt-3 text-fd-muted-foreground">
            Cập nhật góc nhìn công nghệ hoặc kết nối trực tiếp với đội ngũ ODS khi bạn cần hỗ trợ chuyên sâu.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {knowledgeAndSupport.map((item) => {
            const ItemIcon = item.icon;

            return (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-64 flex-col rounded-3xl border border-fd-border/80 bg-fd-card/45 p-6 transition-all hover:-translate-y-0.5 hover:border-orange-500/35 hover:shadow-lg hover:shadow-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
              >
                <span className={`grid size-11 place-items-center rounded-2xl ${item.iconClassName}`}>
                  <ItemIcon className="size-5" />
                </span>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-fd-muted-foreground">
                  {item.label}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">{item.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold">
                  {item.action}
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-fd-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-fd-muted-foreground sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>© {new Date().getFullYear()} Công ty Cổ phần ODS · Trung tâm tri thức giải pháp</p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Liên kết ODS">
            <Link href="/docs" className="hover:text-fd-foreground">
              Tài liệu
            </Link>
            <a
              href={odsExternalLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fd-foreground"
            >
              Giải pháp
            </a>
            <a
              href={odsExternalLinks.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fd-foreground"
            >
              Kiến thức
            </a>
            <a
              href={odsExternalLinks.support}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fd-foreground"
            >
              Hỗ trợ
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
