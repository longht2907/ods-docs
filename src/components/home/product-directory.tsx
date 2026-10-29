import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUpRight,
  BookOpen,
  Braces,
  Cloud,
  PhoneCall,
} from 'lucide-react';
import type {
  HomeLibraryDocument,
  HomeLibraryIcon,
} from '@/lib/home-content';
import styles from '@/app/(home)/home.module.css';

const documentIcons: Record<HomeLibraryIcon, LucideIcon> = {
  book: BookOpen,
  phone: PhoneCall,
  code: Braces,
  cloud: Cloud,
};

interface ProductDirectoryProps {
  documents: readonly HomeLibraryDocument[];
}

export function ProductDirectory({ documents }: ProductDirectoryProps) {
  return (
    <div className={styles.libraryShell} data-home-library>
      <div className={styles.librarySummary}>
        <p>Danh sách tuyển chọn từ tài liệu public đã được xác minh.</p>
        <span>{documents.length} tài liệu</span>
      </div>

      <div className={styles.documentGrid}>
        {documents.map((document) => {
          const Icon = documentIcons[document.icon];

          return (
            <Link
              key={document.href}
              href={document.href}
              className={styles.documentCard}
              data-home-document
            >
              <span className={styles.documentIcon} aria-hidden="true">
                <Icon />
              </span>
              <span className={styles.documentBody}>
                <span className={styles.documentMeta}>
                  <span>{document.product}</span>
                  <span>{document.contentType}</span>
                </span>
                <strong>{document.title}</strong>
                <span>{document.description}</span>
              </span>
              <ArrowUpRight className={styles.documentArrow} aria-hidden="true" />
            </Link>
          );
        })}
      </div>

      <div className={styles.libraryBottom}>
        <span>Không thấy công việc cần thực hiện? Dùng ô tìm kiếm ở đầu trang.</span>
        <Link href="/docs">Duyệt toàn bộ tài liệu <ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
