'use client';

import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUpRight,
  Braces,
  Cloud,
  Layers3,
  LifeBuoy,
  Pause,
  PhoneCall,
  Play,
} from 'lucide-react';
import type { OdsSolutionIcon } from '@/lib/ods-solutions';
import styles from '@/app/(home)/home.module.css';

export interface HeroSolutionLink {
  id: string;
  title: string;
  icon: OdsSolutionIcon;
  href: `#solution-${string}`;
}

const solutionIcons: Record<OdsSolutionIcon, LucideIcon> = {
  phone: PhoneCall,
  cloud: Cloud,
  server: Layers3,
  managed: LifeBuoy,
  license: Braces,
};

export function HeroEcosystem({ solutions }: { solutions: readonly HeroSolutionLink[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(root);

    const handleVisibility = () => setIsDocumentVisible(!document.hidden);
    handleVisibility();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const motionPaused = userPaused || !isInView || !isDocumentVisible;
  const motionLabel = userPaused
    ? 'Tiếp tục chuyển động minh họa hệ sinh thái'
    : 'Tạm dừng chuyển động minh họa hệ sinh thái';

  return (
    <div
      ref={rootRef}
      className={styles.heroGraphic}
      aria-label="Năm giải pháp cốt lõi của ODS"
      data-hero-ecosystem
      data-motion-paused={motionPaused ? 'true' : 'false'}
    >
      <div className={styles.graphicGlow} aria-hidden="true" />
      <div className={styles.graphicRing} aria-hidden="true" />
      <div className={styles.graphicRingSecondary} aria-hidden="true" />
      <div className={styles.graphicDots} aria-hidden="true" />

      <div className={styles.graphicPanel} aria-hidden="true" data-hero-hub>
        <div className={styles.graphicPanelBar}>ODS Documentation{' '}</div>
        <div className={styles.graphicPanelBody}>
          <span className={styles.graphicIcon}><Layers3 /></span>
          <strong>
            Một nơi tra cứu.{' '}
            <em>Hướng dẫn theo từng giải pháp.</em>
          </strong>
        </div>
      </div>

      <div className={styles.coreProductOrbit}>
        {solutions.map((solution, index) => {
          const Icon = solutionIcons[solution.icon];
          return (
            <div
              key={solution.id}
              className={styles.orbitItem}
              data-orbit-position={index + 1}
            >
              <span className={styles.orbitConnection} aria-hidden="true" data-orbit-connection>
                <i />
              </span>
              <a
                href={solution.href}
                className={styles.orbitProduct}
                data-core-product={solution.id}
              >
                <span className={styles.orbitFloat} data-orbit-float>
                  <span className={styles.orbitProductSurface}>
                    <span className={styles.orbitProductIcon}>
                      <Icon aria-hidden="true" />
                    </span>
                    <strong>{solution.title}</strong>
                    <ArrowUpRight aria-hidden="true" />
                  </span>
                </span>
              </a>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className={styles.motionToggle}
        aria-label={motionLabel}
        aria-pressed={userPaused}
        title={motionLabel}
        onClick={() => setUserPaused((paused) => !paused)}
        data-motion-toggle
      >
        {userPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </button>
    </div>
  );
}
