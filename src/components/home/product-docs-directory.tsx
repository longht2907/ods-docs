import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BookOpen,
  Braces,
  Check,
  Cloud,
  KeyRound,
  PhoneCall,
  Server,
  Wrench,
} from 'lucide-react';
import type {
  DocsProduct,
  DocsProductIcon,
  DocsSectionIcon,
} from '@/lib/docs-products';

const productIcons: Record<DocsProductIcon, LucideIcon> = {
  phone: PhoneCall,
  cloud: Cloud,
  server: Server,
  managed: Wrench,
  license: KeyRound,
};

const sectionIcons: Record<DocsSectionIcon, LucideIcon> = {
  'book-open': BookOpen,
  braces: Braces,
};

interface ProductDocsDirectoryProps {
  products: readonly DocsProduct[];
}

export function ProductDocsDirectory({ products }: ProductDocsDirectoryProps) {
  return (
    <div className="ods-product-directory">
      {products.map((product) => {
        const ProductIcon = productIcons[product.icon];

        return (
          <article
            key={product.slug}
            className="ods-product-card"
            data-product-accent={product.accent}
          >
            <div className="ods-product-card-heading">
              <span className="ods-product-mark"><ProductIcon aria-hidden="true" /></span>
              <div>
                <p>{product.category}</p>
                <h3>{product.name}</h3>
              </div>
            </div>

            <p className="ods-product-card-summary">{product.landingSummary}</p>

            <ul className="ods-product-capabilities" aria-label={`Khả năng của ${product.name}`}>
              {product.capabilities.map((capability) => (
                <li key={capability}><Check aria-hidden="true" />{capability}</li>
              ))}
            </ul>

            <div className="ods-product-sections" aria-label={`Tài liệu ${product.name}`}>
              {product.sections.map((section) => {
                const SectionIcon = sectionIcons[section.icon];

                return (
                  <Link key={`${section.kind}-${section.href}`} href={section.href}>
                    <span><SectionIcon aria-hidden="true" /></span>
                    <span className="min-w-0 flex-1">
                      <strong>{section.title}</strong>
                      <small>{section.description}</small>
                    </span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                );
              })}
            </div>

            <Link href={product.href} className="ods-text-link">
              Mở tài liệu {product.shortName} <ArrowRight aria-hidden="true" />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
