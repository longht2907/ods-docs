import type { LucideIcon } from 'lucide-react';
import {
  ArrowUpRight,
  Cloud,
  KeyRound,
  Network,
  PhoneCall,
  Server,
  Wrench,
} from 'lucide-react';
import {
  odsSolutionGroups,
  type OdsSolutionIcon,
} from '@/lib/ods-solutions';

const solutionIcons: Record<OdsSolutionIcon, LucideIcon> = {
  phone: PhoneCall,
  cloud: Cloud,
  server: Server,
  managed: Wrench,
  license: KeyRound,
};

export function SolutionMap() {
  return (
    <aside className="ods-solution-map" aria-labelledby="ods-solution-map-title">
      <div className="ods-solution-map-heading">
        <span className="ods-solution-map-core" aria-hidden="true">
          <Network />
        </span>
        <div>
          <p>Hệ sinh thái ODS</p>
          <h2 id="ods-solution-map-title">Năm nhóm giải pháp, một điểm tra cứu</h2>
        </div>
      </div>

      <div className="ods-solution-map-grid">
        {odsSolutionGroups.map((solution) => {
          const SolutionIcon = solutionIcons[solution.icon];

          return (
            <a
              key={solution.id}
              href={solution.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ods-solution-map-item"
            >
              <span className="ods-solution-map-icon"><SolutionIcon aria-hidden="true" /></span>
              <span className="min-w-0 flex-1">
                <strong>{solution.title}</strong>
                <small>{solution.description}</small>
              </span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          );
        })}
      </div>

      <p className="ods-solution-map-note">
        Khám phá toàn bộ sản phẩm và dịch vụ trên website chính thức của ODS.
      </p>
    </aside>
  );
}
