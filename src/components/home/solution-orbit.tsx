import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Braces, Webhook } from 'lucide-react';
import type {
  HomeIntegrationEntry,
  HomeIntegrationIcon,
} from '@/lib/home-content';
import styles from '@/app/(home)/home.module.css';

const integrationIcons: Record<HomeIntegrationIcon, LucideIcon> = {
  api: Braces,
  webhook: Webhook,
};

interface SolutionOrbitProps {
  entries: readonly HomeIntegrationEntry[];
}

export function SolutionOrbit({ entries }: SolutionOrbitProps) {
  return (
    <div className={styles.integrationPanel} data-home-integration>
      <div className={styles.integrationScope}>
        <strong>Phạm vi hiện có</strong>
        <span>AI Contact Center</span>
        <p>Chọn tài liệu kỹ thuật phù hợp với cách hệ thống của bạn kết nối cuộc gọi và dữ liệu.</p>
      </div>

      <div className={styles.integrationLinks}>
        {entries.map((entry) => {
          const Icon = integrationIcons[entry.icon];

          return (
            <Link
              key={entry.id}
              href={entry.href}
              data-home-integration-link={entry.id}
            >
              <span className={styles.integrationIcon} aria-hidden="true"><Icon /></span>
              <span>
                <strong>{entry.title}</strong>
                <small>{entry.description}</small>
              </span>
              <ArrowRight aria-hidden="true" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
