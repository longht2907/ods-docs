'use client';

import type { KeyboardEvent } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import {
  BookOpen,
  Braces,
  Check,
  Cloud,
  FileText,
  FolderClosed,
  Pause,
  Play,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import type { HomeChapter } from '@/lib/home-content';

interface HeroPreviewProps {
  chapters: readonly HomeChapter[];
}

const previewTabs = [
  { id: 'portal', label: 'Portal', icon: BookOpen },
  { id: 'api', label: 'API', icon: Braces },
  { id: 'cloudfile', label: 'CloudFile', icon: Cloud },
] as const;

const apiCode = `curl --request POST \\
  --url https://api.ods.vn/v1/calls/make \\
  --header "Authorization: Bearer <YOUR_API_TOKEN>" \\
  --header "Content-Type: application/json" \\
  --data '{"extension":"101","phone":"0900000000"}'`;

export function HeroPreview({ chapters }: HeroPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const instanceId = useId();

  const activeTab = previewTabs[activeIndex];
  const autoPaused = pausedByUser || pointerInside || focusInside || !pageVisible || reducedMotion;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener('change', updatePreference);
    return () => media.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (autoPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % previewTabs.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [autoPaused]);

  useEffect(() => {
    if (activeTab.id !== 'api') {
      setTypedLength(0);
      return;
    }
    if (reducedMotion) {
      setTypedLength(apiCode.length);
      return;
    }

    setTypedLength(0);
    const timer = window.setInterval(() => {
      setTypedLength((current) => {
        if (current >= apiCode.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, 18);
    return () => window.clearInterval(timer);
  }, [activeTab.id, reducedMotion]);

  function activateTab(index: number, manual = false) {
    setActiveIndex(index);
    if (manual) setPausedByUser(true);
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % previewTabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + previewTabs.length) % previewTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = previewTabs.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    activateTab(nextIndex, true);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div
      className="ods-hero-preview"
      onMouseEnter={() => setPointerInside(true)}
      onMouseLeave={() => setPointerInside(false)}
      onFocusCapture={() => setFocusInside(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocusInside(false);
      }}
    >
      <div className="ods-preview-toolbar">
        <div className="ods-preview-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="ods-preview-url">docs.ods.vn/workspace</span>
        <button
          type="button"
          className="ods-preview-motion-control"
          onClick={() => setPausedByUser((paused) => !paused)}
          disabled={reducedMotion}
          aria-label={
            reducedMotion
              ? 'Tự chuyển tab đã tắt theo cài đặt giảm chuyển động'
              : pausedByUser
                ? 'Tiếp tục tự chuyển tab'
                : 'Dừng tự chuyển tab'
          }
        >
          {pausedByUser || reducedMotion ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        </button>
      </div>

      <div className="ods-preview-tabs" role="tablist" aria-label="Xem trước không gian tài liệu">
        {previewTabs.map((tab, index) => {
          const TabIcon = tab.icon;
          const selected = index === activeIndex;
          return (
            <button
              key={tab.id}
              ref={(element) => { tabRefs.current[index] = element; }}
              id={`${instanceId}-${tab.id}-tab`}
              type="button"
              role="tab"
              tabIndex={selected ? 0 : -1}
              aria-selected={selected}
              aria-controls={`${instanceId}-${tab.id}-panel`}
              onClick={() => activateTab(index, true)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <TabIcon aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${instanceId}-${activeTab.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${instanceId}-${activeTab.id}-tab`}
        className="ods-preview-panel"
      >
        {activeTab.id === 'portal' ? (
          <div className="ods-portal-preview">
            <aside aria-label="Chương Portal">
              <span className="ods-preview-brand"><BookOpen aria-hidden="true" /> Portal Guide</span>
              <span className="ods-preview-nav-item is-active">Tổng quan</span>
              {chapters.map((chapter, index) => (
                <span key={chapter.href} className="ods-preview-nav-item">
                  <span>{String(index + 1).padStart(2, '0')}</span> {chapter.title}
                </span>
              ))}
            </aside>
            <div className="ods-preview-document">
              <span className="ods-preview-kicker">HƯỚNG DẪN SỬ DỤNG</span>
              <strong>Triển khai Portal theo từng bước</strong>
              <p>Cấu hình dịch vụ, người dùng và tổng đài trong một luồng tài liệu rõ ràng.</p>
              <div className="ods-preview-progress">
                <span><Check aria-hidden="true" /> Thiết lập ban đầu</span>
                <span><Check aria-hidden="true" /> Phân quyền người dùng</span>
                <span><RefreshCw aria-hidden="true" /> Vận hành tổng đài</span>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab.id === 'api' ? (
          <div className="ods-api-preview">
            <div className="ods-code-header">
              <span><Braces aria-hidden="true" /> Tạo cuộc gọi</span>
              <span>cURL</span>
            </div>
            <pre aria-label="Ví dụ cURL API"><code>{apiCode.slice(0, typedLength)}<span className="ods-code-caret" aria-hidden="true" /></code></pre>
          </div>
        ) : null}

        {activeTab.id === 'cloudfile' ? (
          <div className="ods-cloud-preview">
            <div className="ods-cloud-summary">
              <span className="ods-cloud-icon"><Cloud aria-hidden="true" /></span>
              <div><strong>Không gian doanh nghiệp</strong><span>Đã đồng bộ · 2 phút trước</span></div>
              <ShieldCheck aria-label="Đã bảo vệ" />
            </div>
            <div className="ods-file-list">
              <span><FolderClosed aria-hidden="true" /><b>Dự án khách hàng</b><small>24 mục</small></span>
              <span><FolderClosed aria-hidden="true" /><b>Tài liệu nội bộ</b><small>18 mục</small></span>
              <span><FileText aria-hidden="true" /><b>Checklist triển khai.pdf</b><small>1.8 MB</small></span>
            </div>
            <div className="ods-sync-status"><Check aria-hidden="true" /> Tất cả tệp đã được đồng bộ an toàn</div>
          </div>
        ) : null}
      </div>

      <div className="ods-preview-progress-dots" aria-hidden="true">
        {previewTabs.map((tab, index) => <span key={tab.id} className={index === activeIndex ? 'is-active' : undefined} />)}
      </div>
    </div>
  );
}
