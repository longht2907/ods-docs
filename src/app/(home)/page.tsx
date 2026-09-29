import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Headphones,
  LifeBuoy,
  Mail,
  Phone,
} from 'lucide-react';
import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { odsExternalLinks } from '@/lib/docs-products';
import { getHomeContentModel } from '@/lib/home-content';
import { SolutionOrbit } from '@/components/home/solution-orbit';
import { ProductDirectory } from '@/components/home/product-directory';
import { gitConfig } from '@/lib/shared';

export default function HomePage() {
  const content = getHomeContentModel();

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

      {/* 2. DẢI GIỚI THIỆU ODS — SHOWCASE 5 TRỤ CỘT GIẢI PHÁP */}
      <SolutionOrbit />

      {/* 3. DANH MỤC TÀI LIỆU SẢN PHẨM CHUẨN HÓA */}
      <ProductDirectory />

      {/* 4. HỖ TRỢ & ĐỒNG HÀNH DOANH NGHIỆP */}
      <section className="border-t border-fd-border/70 bg-fd-card/40 py-16 sm:py-20">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400">
                  <Headphones className="size-3.5" aria-hidden="true" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">
                  Hỗ trợ &amp; Đồng hành
                </p>
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-fd-foreground sm:text-3xl">
                Bạn cần thêm trợ giúp kỹ thuật?
              </h2>
            </div>
            <p className="max-w-md text-xs text-fd-muted-foreground sm:text-sm">
              Đội ngũ kỹ sư ODS luôn sẵn sàng giải đáp thắc mắc, hỗ trợ tích hợp API và vận hành hệ thống 24/7/365.
            </p>
          </div>

          {/* 3 Thẻ Hỗ trợ Glassmorphism */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {/* Card 1: Support Portal & Hotline */}
            <div className="ods-support-hub-card group relative flex flex-col justify-between rounded-2xl border border-fd-border/80 bg-fd-card/80 p-6 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-xl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 transition-transform group-hover:scale-110">
                    <Headphones className="size-5" aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-[10px] font-bold text-orange-600 dark:text-orange-400">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                    24/7/365 SLA
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-fd-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400">
                  Support Portal &amp; Kỹ thuật 24/7
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-fd-muted-foreground">
                  Gửi ticket yêu cầu kỹ thuật, tra cứu tiến độ xử lý sự cố và cam kết thời gian phản hồi SLA tức thì.
                </p>

                {/* Direct Contact Info */}
                <div className="mt-4 space-y-2 rounded-xl border border-fd-border/70 bg-fd-muted/50 p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-fd-muted-foreground flex items-center gap-1.5">
                      <Phone className="size-3.5 text-orange-500" aria-hidden="true" /> Hotline:
                    </span>
                    <a
                      href="tel:19006634"
                      className="font-bold text-fd-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                      1900 6634
                    </a>
                  </div>
                  <div className="flex items-center justify-between border-t border-fd-border/50 pt-2">
                    <span className="text-fd-muted-foreground flex items-center gap-1.5">
                      <Mail className="size-3.5 text-orange-500" aria-hidden="true" /> Email:
                    </span>
                    <a
                      href="mailto:support@ods.vn"
                      className="font-semibold text-fd-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                      support@ods.vn
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="mailto:support@ods.vn?subject=[ODS%20Docs]%20Y%C3%AAu%20c%E1%BA%A7u%20h%E1%BB%97%20tr%E1%BB%A3%20k%E1%BB%B9%20thu%E1%BA%ADt"
                className="mt-6 flex items-center justify-between border-t border-fd-border/60 pt-3 text-xs font-semibold text-orange-600 dark:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring rounded hover:underline"
              >
                <span>Gửi email hỗ trợ kỹ thuật</span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </div>

            {/* Card 2: Knowledge Base & Tech Blog */}
            <a
              href={odsExternalLinks.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="ods-support-hub-card group relative flex flex-col justify-between rounded-2xl border border-fd-border/80 bg-fd-card/80 p-6 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 transition-transform group-hover:scale-110">
                    <BookOpen className="size-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-600 dark:text-sky-400">
                    Tech Blog &amp; Case Study
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-fd-foreground group-hover:text-sky-600 dark:group-hover:text-sky-400">
                  Trung tâm Kiến thức
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-fd-muted-foreground">
                  Bài viết chuyên sâu, kinh nghiệm triển khai thực tế, kiến trúc Cloud và cẩm nang công nghệ từ ODS.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-fd-border/60 pt-3 text-xs font-semibold text-sky-600 dark:text-sky-400">
                <span>Đọc bài viết mới nhất</span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </div>
            </a>

            {/* Card 3: Consultation */}
            <a
              href={odsExternalLinks.contact}
              target="_blank"
              rel="noopener noreferrer"
              className="ods-support-hub-card group relative flex flex-col justify-between rounded-2xl border border-fd-border/80 bg-fd-card/80 p-6 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110">
                    <LifeBuoy className="size-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    Tư vấn 1-1
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-fd-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  Liên hệ Tư vấn
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-fd-muted-foreground">
                  Trao đổi trực tiếp với đội ngũ tư vấn giải pháp ODS về kiến trúc hệ thống và nhu cầu doanh nghiệp.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-fd-border/60 pt-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Kết nối với chuyên gia</span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 5. FOOTER 2 TẦNG DOANH NGHIỆP */}
      <footer className="border-t border-fd-border/80 bg-fd-card/70 backdrop-blur">
        <div className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 lg:px-12">
          {/* Tầng trên: Brand & Multi-column Links */}
          <div className="grid grid-cols-1 gap-8 pb-10 border-b border-fd-border/60 md:grid-cols-4">
            {/* Cột 1: Brand & Status */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" aria-hidden="true" />
                <span className="text-base font-extrabold tracking-tight text-fd-foreground">
                  ODS Docs
                </span>
                <span className="rounded-md border border-fd-border bg-fd-muted px-1.5 py-0.5 text-[10px] font-mono text-fd-muted-foreground">
                  v1.0
                </span>
              </div>
              <p className="max-w-sm text-xs leading-relaxed text-fd-muted-foreground">
                Trung tâm tài liệu kỹ thuật và cẩm nang vận hành chính thức cho các giải pháp Hạ tầng số, Cloud và AI của Công ty Cổ phần ODS.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-fd-border/80 bg-fd-muted/50 px-2.5 py-1 text-[11px] font-medium text-fd-muted-foreground">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                <span>Hệ thống tài liệu: Trực tuyến 24/7</span>
              </div>
            </div>

            {/* Cột 2: Không gian tài liệu */}
            <div className="space-y-2.5 text-xs">
              <p className="font-bold text-fd-foreground tracking-wide uppercase text-[11px]">
                Tài liệu Sản phẩm
              </p>
              <ul className="space-y-2 text-fd-muted-foreground">
                <li>
                  <Link href="/docs/ai-contact-center" className="transition-colors hover:text-fd-foreground">
                    AI Contact Center
                  </Link>
                </li>
                <li>
                  <Link href="/docs/cloudfile" className="transition-colors hover:text-fd-foreground">
                    ODS CloudFile
                  </Link>
                </li>
                <li>
                  <Link href="/docs/ai-contact-center/api" className="transition-colors hover:text-fd-foreground">
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cột 3: Hệ sinh thái & Kênh liên hệ */}
            <div className="space-y-2.5 text-xs">
              <p className="font-bold text-fd-foreground tracking-wide uppercase text-[11px]">
                Hệ sinh thái &amp; Liên hệ
              </p>
              <ul className="space-y-2 text-fd-muted-foreground">
                <li>
                  <a
                    href={odsExternalLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-fd-foreground"
                  >
                    Website ODS <ArrowUpRight className="size-3" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={odsExternalLinks.identity}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-fd-foreground"
                  >
                    ODS ID Portal <ArrowUpRight className="size-3" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href="tel:19006634"
                    className="inline-flex items-center gap-1 font-semibold text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    Hotline: 1900 6634
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@ods.vn"
                    className="inline-flex items-center gap-1 hover:text-fd-foreground"
                  >
                    Email: support@ods.vn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Tầng dưới: Bản quyền & Slogan */}
          <div className="flex flex-col justify-between gap-4 pt-8 text-xs text-fd-muted-foreground sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} Công ty Cổ phần ODS. Toàn quyền bảo lưu.</p>
            <div className="flex items-center gap-4">
              <span className="font-medium text-fd-foreground/80">
                Hạ tầng số · Cloud · AI
              </span>
              <span aria-hidden="true" className="text-fd-border">·</span>
              <a
                href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-fd-foreground"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
