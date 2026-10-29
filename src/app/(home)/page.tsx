import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Cloud,
  Layers3,
  LifeBuoy,
  Mail,
  PhoneCall,
} from 'lucide-react';
import { HeroEcosystem } from '@/components/home/hero-ecosystem';
import { HomeSearchTrigger } from '@/components/home/home-search-trigger';
import { ProductDirectory } from '@/components/home/product-directory';
import { SolutionOrbit } from '@/components/home/solution-orbit';
import {
  docsProducts,
  odsExternalLinks,
  type DocsProductIcon,
} from '@/lib/docs-products';
import { getHomeContentModel } from '@/lib/home-content';
import { odsSolutionGroups } from '@/lib/ods-solutions';
import styles from './home.module.css';

const productIcons: Record<DocsProductIcon, LucideIcon> = {
  phone: PhoneCall,
  cloud: Cloud,
  server: Layers3,
  managed: LifeBuoy,
  license: Braces,
};

export default function HomePage() {
  const content = getHomeContentModel();
  const additionalSolutions = odsSolutionGroups.filter(
    (group) => !group.products.some((product) => product.docsSlug),
  );
  const heroSolutions = odsSolutionGroups.map((group) => ({
    id: group.id,
    title: group.title,
    icon: group.icon,
    href: `#solution-${group.id}` as const,
  }));

  return (
    <main className={styles.page} data-home-v4>
      <section className={styles.hero} aria-labelledby="home-hero-title">
        <div className={styles.heroGridPattern} aria-hidden="true" />
        <div className={`${styles.container} ${styles.heroLayout}`}>
          <div className={styles.heroCopy}>
            <h1 id="home-hero-title">
              Tài liệu
              <span>sản phẩm ODS</span>
            </h1>
            <p className={styles.heroDescription}>
              Trung tâm tài liệu ODS cho hướng dẫn sử dụng và tích hợp sản phẩm,
              từ thiết lập ban đầu đến kết nối API và Webhook.
            </p>

            <div className={styles.heroSearchWrap}>
              <HomeSearchTrigger />
              <div className={styles.suggestions} aria-label="Gợi ý nhanh">
                <span>Gợi ý nhanh</span>
                {content.searchSuggestions.map((suggestion) => (
                  <Link key={suggestion.href} href={suggestion.href}>
                    {suggestion.label}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            <a className={styles.heroSolutionLink} href="#products">
              Chọn giải pháp hoặc sản phẩm <ArrowRight aria-hidden="true" />
            </a>
          </div>

          <HeroEcosystem solutions={heroSolutions} />
        </div>
      </section>

      <section className={styles.productsSection} id="products" aria-labelledby="products-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <h2 id="products-title">Bạn đang tìm tài liệu cho <span>giải pháp nào?</span></h2>
            </div>
            <p>Chọn đúng nhóm giải pháp, sau đó bắt đầu từ sản phẩm hoặc điểm vào phù hợp.</p>
          </div>

          <div className={styles.productGrid}>
            {docsProducts.map((product) => {
              const Icon = productIcons[product.icon];
              const solutionGroup = odsSolutionGroups.find((group) =>
                group.products.some(({ docsSlug }) => docsSlug === product.slug),
              );
              const guide = content.productGuides.find(
                ({ productSlug }) => productSlug === product.slug,
              );

              if (!solutionGroup || !guide) {
                throw new Error(`Thiếu mapping Home cho sản phẩm "${product.slug}".`);
              }

              return (
                <article
                  key={product.slug}
                  id={`solution-${solutionGroup.id}`}
                  className={styles.productCard}
                  data-product={product.slug}
                  data-solution-group={solutionGroup.id}
                >
                  <div className={styles.productArt} aria-hidden="true">
                    <div className={styles.productOrbit} />
                    <div className={styles.productArtCard}>
                      <span><Icon /></span>
                      <small>{solutionGroup.title}</small>
                      <strong>{product.shortName}</strong>
                    </div>
                  </div>
                  <div className={styles.productBody}>
                    <p className={styles.productContext}>
                      <span>{solutionGroup.title}</span>
                      <span>Tài liệu tại hub</span>
                    </p>
                    <h3>{product.shortName}<span>.</span></h3>
                    <p>{product.description}</p>

                    <div className={styles.productPathways}>
                      {guide.groups.map((group) => (
                        <div key={group.title}>
                          <strong>{group.title}</strong>
                          <div>
                            {group.links.map((link) => (
                              <Link key={link.href} href={link.href}>
                                {link.label}<ArrowRight aria-hidden="true" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.productActions}>
                      <Link href={product.href}>
                        Tài liệu tại hub <ArrowRight aria-hidden="true" />
                      </Link>
                      <a href={product.productUrl} target="_blank" rel="noopener noreferrer">
                        Thông tin sản phẩm trên ods.vn <ArrowUpRight aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.moreSolutions}>
            <div>
              <strong>Các nhóm giải pháp khác</strong>
              <span>Thông tin giải pháp trên ods.vn</span>
            </div>
            {additionalSolutions.map((group) => (
              <a
                key={group.id}
                id={`solution-${group.id}`}
                href={group.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-solution-group={group.id}
              >
                <span><strong>{group.title}</strong><small>Thông tin giải pháp trên ods.vn</small></span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.librarySection} id="library" aria-labelledby="library-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <h2 id="library-title">Bạn cần thực hiện <span>công việc gì?</span></h2>
              <p className={styles.sectionSummary}>Tài liệu nổi bật được tuyển chọn theo công việc cần thực hiện.</p>
            </div>
            <Link href="/docs" className={styles.headingLink}>
              Duyệt toàn bộ tài liệu <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ProductDirectory documents={content.libraryDocuments} />
        </div>
      </section>

      <section className={styles.integrationSection} id="integration" aria-labelledby="integration-title">
        <div className={styles.container}>
          <div className={styles.integrationIntro}>
            <h2 id="integration-title">Xây dựng tích hợp <span>với ODS.</span></h2>
            <p>Điểm vào kỹ thuật hiện có dành cho AI Contact Center.</p>
          </div>
          <SolutionOrbit entries={content.integrationEntries} />
        </div>
      </section>

      <section className={styles.supportSection} id="support" aria-labelledby="support-title">
        <div className={styles.container}>
          <div className={styles.supportPanel}>
            <div>
              <h2 id="support-title">Chưa tìm được tài liệu <span>phù hợp?</span></h2>
              <p>Liên hệ đội ngũ ODS, kèm tên sản phẩm và nội dung cần hỗ trợ.</p>
            </div>
            <div className={styles.supportContacts}>
              <a href="mailto:support@ods.vn">
                <Mail aria-hidden="true" />
                <span><small>Email hỗ trợ</small><strong>support@ods.vn</strong></span>
                <ArrowRight aria-hidden="true" />
              </a>
              <a href="tel:19006634">
                <PhoneCall aria-hidden="true" />
                <span><small>Hotline liên hệ</small><strong>1900 6634</strong></span>
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Image src="/ods-logo.png" alt="ODS" width={91} height={33} />
              <span>Platform Documentation</span>
              <p>Hướng dẫn sử dụng và tích hợp sản phẩm ODS.</p>
            </div>
            <div className={styles.footerLinks}>
              <div>
                <strong>Liên kết</strong>
                <Link href="/docs">Duyệt toàn bộ tài liệu</Link>
                <a href={odsExternalLinks.website} target="_blank" rel="noopener noreferrer">Website ODS</a>
                <a href={odsExternalLinks.support} target="_blank" rel="noopener noreferrer">Support Portal</a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span>© {new Date().getFullYear()} Công ty Cổ phần ODS. All rights reserved.</span>
            <span>Tài liệu sản phẩm chính thức của ODS</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
