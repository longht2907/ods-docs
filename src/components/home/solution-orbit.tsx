'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Cloud,
  Cpu,
  Database,
  FolderSync,
  Headphones,
  KeyRound,
  Layers3,
  Lock,
  PhoneCall,
  Server,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react';
import {
  odsSolutionGroups,
  type OdsSolutionIcon,
} from '@/lib/ods-solutions';
import { odsExternalLinks } from '@/lib/docs-products';

const solutionIcons: Record<OdsSolutionIcon, LucideIcon> = {
  phone: PhoneCall,
  cloud: Cloud,
  server: Server,
  managed: Wrench,
  license: KeyRound,
};

interface PillarDetail {
  tagline: string;
  badgeText: string;
  metrics: Array<{ label: string; value: string }>;
  capabilities: Array<{ icon: LucideIcon; title: string; desc: string }>;
  docsHref?: string;
  docsLabel?: string;
}

const pillarDetails: Record<string, PillarDetail> = {
  'ai-customer-experience': {
    tagline: 'Nâng cao trải nghiệm khách hàng với tổng đài AI đa kênh',
    badgeText: 'Smart CX & Voice AI',
    metrics: [
      { label: 'Tỷ lệ sẵn sàng', value: '99.9%' },
      { label: 'Kênh tích hợp', value: 'Đa kênh AI' },
      { label: 'Giao thức', value: 'REST & Webhook' },
    ],
    capabilities: [
      {
        icon: Headphones,
        title: 'Tổng đài ảo thông minh',
        desc: 'Định tuyến cuộc gọi thông minh (IVR, ACD), giám sát realtime và máy nhánh không giới hạn.',
      },
      {
        icon: Bot,
        title: 'AutoCall & Voice OTP',
        desc: 'Chiến dịch gọi tự động hàng loạt, phát thông báo giọng nói và gửi mã xác thực OTP tức thì.',
      },
      {
        icon: Zap,
        title: 'Tích hợp CRM & Zalo OA',
        desc: 'Kết nối Zalo OA chăm sóc khách hàng, đồng bộ dữ liệu qua REST API và Webhook.',
      },
    ],
    docsHref: '/docs/ai-contact-center',
    docsLabel: 'Xem tài liệu AI Contact Center',
  },
  'cloud-services': {
    tagline: 'Hạ tầng điện toán đám mây linh hoạt và lưu trữ an toàn',
    badgeText: 'Enterprise Cloud',
    metrics: [
      { label: 'Cam kết SLA', value: '99.99%' },
      { label: 'Tiêu chuẩn DC', value: 'Tier 3 quốc tế' },
      { label: 'Lưu trữ S3', value: 'Multi-zone' },
    ],
    capabilities: [
      {
        icon: Cloud,
        title: 'Private Cloud doanh nghiệp',
        desc: 'Hạ tầng máy chủ ảo độc lập, tài nguyên CPU/RAM/NVMe chuyên dụng với SLA 99.99%.',
      },
      {
        icon: Database,
        title: 'Cloud Storage S3',
        desc: 'Lưu trữ đối tượng tương thích S3 API, không giới hạn dung lượng, mã hóa và bảo mật cao.',
      },
      {
        icon: FolderSync,
        title: 'CloudFile - Lưu trữ & Đồng bộ',
        desc: 'Đồng bộ đa nền tảng (Windows, macOS, Mobile), phân quyền dữ liệu theo phòng ban & dự án.',
      },
    ],
    docsHref: '/docs/cloudfile',
    docsLabel: 'Xem tài liệu CloudFile',
  },
  'digital-infrastructure': {
    tagline: 'Trung tâm dữ liệu chuẩn Tier 3 và máy chủ chuyên dụng',
    badgeText: 'Tier 3 Datacenter',
    metrics: [
      { label: 'Chuẩn Datacenter', value: 'Tier 3 Uptime' },
      { label: 'Chống DDoS', value: '500Gbps+ đa lớp' },
      { label: 'Nguồn & Mạng', value: '2N + 1 Redundant' },
    ],
    capabilities: [
      {
        icon: Server,
        title: 'Chỗ đặt máy chủ (Colocation)',
        desc: 'Đặt tại Trung tâm dữ liệu tiêu chuẩn Tier 3 quốc tế, nguồn điện 2N+1 và điều hòa chính xác.',
      },
      {
        icon: Cpu,
        title: 'Máy chủ dùng riêng (Dedicated Server)',
        desc: 'Phần cứng Dell/HP Enterprise chính hãng cấu hình cao, toàn quyền kiểm soát root/admin.',
      },
      {
        icon: ShieldCheck,
        title: 'Tủ Rack riêng & Chống DDoS',
        desc: 'Private Rack bảo mật riêng biệt, tích hợp hệ thống tường lửa lọc tấn công DDoS đa lớp tự động.',
      },
    ],
  },
  'managed-services': {
    tagline: 'Dịch vụ quản trị và ứng cứu sự cố hệ thống 24/7/365',
    badgeText: '24/7/365 SLA Standard',
    metrics: [
      { label: 'Thời gian phản hồi', value: '< 15 phút SLA' },
      { label: 'Hỗ trợ kỹ thuật', value: '24/7/365' },
      { label: 'Giám sát', value: 'Proactive Alert' },
    ],
    capabilities: [
      {
        icon: Wrench,
        title: 'Quản trị hệ thống máy chủ',
        desc: 'Cài đặt, tối ưu hóa hiệu năng, cập nhật bảo mật và sao lưu dữ liệu định kỳ cho Windows/Linux.',
      },
      {
        icon: Zap,
        title: 'Giám sát chủ động 24/7',
        desc: 'Hệ thống theo dõi tài nguyên liên tục, phát hiện sớm nguy cơ quá tải và cảnh báo tự động.',
      },
      {
        icon: ShieldCheck,
        title: 'Ứng cứu sự cố theo SLA',
        desc: 'Đội ngũ kỹ sư ODS trực chiến 24/7/365, cam kết thời gian phản hồi và xử lý dưới 15 phút.',
      },
    ],
  },
  'software-license': {
    tagline: 'Bản quyền phần mềm chính hãng và Control Panel quản trị',
    badgeText: '100% Genuine License',
    metrics: [
      { label: 'Nguồn gốc', value: '100% Chính hãng' },
      { label: 'Mô hình cấp phép', value: 'Microsoft SPLA' },
      { label: 'Kỳ hạn', value: 'Linh hoạt theo tháng' },
    ],
    capabilities: [
      {
        icon: Lock,
        title: 'Microsoft SPLA chính hãng',
        desc: 'Cung cấp bản quyền Windows Server, MS SQL Server, Remote Desktop Services linh hoạt theo tháng.',
      },
      {
        icon: KeyRound,
        title: 'Bảng điều khiển cPanel & Plesk',
        desc: 'Bản quyền Control Panel quản trị máy chủ, website và hosting chuyên nghiệp hàng đầu thế giới.',
      },
      {
        icon: Sparkles,
        title: 'Cấp phép & Gia hạn tự động',
        desc: 'Kích hoạt license tức thì, đảm bảo tuân thủ pháp lý và hỗ trợ kỹ thuật trong suốt quá trình sử dụng.',
      },
    ],
  },
};

const pillarColors: Record<
  string,
  {
    border: string;
    bgGlow: string;
    badge: string;
    accentText: string;
    activeTab: string;
    iconColor: string;
  }
> = {
  'ai-customer-experience': {
    border: 'border-orange-500/40',
    bgGlow: 'from-orange-500/10 via-amber-500/5 to-transparent',
    badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
    accentText: 'text-orange-600 dark:text-orange-400',
    activeTab: 'bg-orange-500 text-white shadow-lg shadow-orange-500/25',
    iconColor: 'text-orange-500 bg-orange-500/10',
  },
  'cloud-services': {
    border: 'border-sky-500/40',
    bgGlow: 'from-sky-500/10 via-blue-500/5 to-transparent',
    badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
    accentText: 'text-sky-600 dark:text-sky-400',
    activeTab: 'bg-sky-600 text-white shadow-lg shadow-sky-600/25',
    iconColor: 'text-sky-500 bg-sky-500/10',
  },
  'digital-infrastructure': {
    border: 'border-emerald-500/40',
    bgGlow: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    accentText: 'text-emerald-600 dark:text-emerald-400',
    activeTab: 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25',
    iconColor: 'text-emerald-500 bg-emerald-500/10',
  },
  'managed-services': {
    border: 'border-violet-500/40',
    bgGlow: 'from-violet-500/10 via-purple-500/5 to-transparent',
    badge: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30',
    accentText: 'text-violet-600 dark:text-violet-400',
    activeTab: 'bg-violet-600 text-white shadow-lg shadow-violet-600/25',
    iconColor: 'text-violet-500 bg-violet-500/10',
  },
  'software-license': {
    border: 'border-amber-500/40',
    bgGlow: 'from-amber-500/10 via-yellow-500/5 to-transparent',
    badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    accentText: 'text-amber-600 dark:text-amber-400',
    activeTab: 'bg-amber-600 text-white shadow-lg shadow-amber-600/25',
    iconColor: 'text-amber-500 bg-amber-500/10',
  },
};

export function SolutionOrbit() {
  const [selectedId, setSelectedId] = useState<string>('ai-customer-experience');

  const selectedGroup =
    odsSolutionGroups.find((g) => g.id === selectedId) || odsSolutionGroups[0];
  const detail = pillarDetails[selectedGroup.id] || pillarDetails['ai-customer-experience'];
  const color = pillarColors[selectedGroup.id] || pillarColors['ai-customer-experience'];
  const SelectedIcon = solutionIcons[selectedGroup.icon];
  const hasDocs = selectedGroup.products.some((p) => p.docsSlug);

  return (
    <section
      className="ods-showcase-section relative isolate overflow-hidden border-y border-fd-border/70 bg-fd-card/30 py-14 sm:py-20"
      aria-labelledby="ods-showcase-title"
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b ${color.bgGlow} transition-all duration-500`}
      />

      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Layers3 className="size-4" aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">
              Hệ sinh thái ODS
            </span>
          </div>
          <h2
            id="ods-showcase-title"
            className="mt-3 text-balance text-2xl font-bold tracking-tight text-fd-foreground sm:text-3xl lg:text-4xl"
          >
            5 Trụ Cột Giải Pháp Doanh Nghiệp
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-fd-muted-foreground sm:text-base">
            Hạ tầng số tin cậy, nền tảng Cloud linh hoạt và ứng dụng AI thông minh giúp doanh nghiệp tối ưu vận hành và mở rộng quy mô.
          </p>
        </div>

        {/* 1. Horizontal Pillar Tab Selector */}
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          role="tablist"
          aria-label="Chọn trụ cột giải pháp ODS"
        >
          {odsSolutionGroups.map((group) => {
            const Icon = solutionIcons[group.icon];
            const isSelected = group.id === selectedGroup.id;
            const groupHasDocs = group.products.some((p) => p.docsSlug);
            const groupColor = pillarColors[group.id];

            return (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedId(group.id)}
                className={`group inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring sm:text-sm ${
                  isSelected
                    ? groupColor.activeTab
                    : 'border border-fd-border/80 bg-fd-card/80 text-fd-muted-foreground hover:border-fd-border hover:bg-fd-accent hover:text-fd-foreground shadow-sm backdrop-blur'
                }`}
              >
                <Icon
                  className={`size-4 shrink-0 transition-transform ${
                    isSelected ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                  aria-hidden="true"
                />
                <span>{group.title}</span>
                {groupHasDocs && !isSelected && (
                  <span className="size-1.5 rounded-full bg-orange-500" title="Có tài liệu" />
                )}
              </button>
            );
          })}
        </div>

        {/* 2. Interactive Showcase Box */}
        <div
          className={`mt-8 overflow-hidden rounded-2xl border bg-fd-card/80 p-6 shadow-xl backdrop-blur-md transition-all duration-300 sm:p-8 lg:p-10 ${color.border}`}
        >
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            {/* Cột trái: Chi tiết trụ cột & Chỉ số */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Badge trạng thái */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${color.badge}`}
                  >
                    <SelectedIcon className="size-3.5" aria-hidden="true" />
                    Trụ cột giải pháp
                  </span>
                  {hasDocs ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-orange-600 dark:text-orange-400">
                      <span className="size-1.5 rounded-full bg-orange-500 animate-ping" />
                      Đã có tài liệu chính thức
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-fd-border bg-fd-muted px-2.5 py-0.5 text-xs font-medium text-fd-muted-foreground">
                      Giải pháp doanh nghiệp
                    </span>
                  )}
                </div>

                {/* Tiêu đề & Mô tả */}
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-fd-foreground sm:text-3xl">
                  {selectedGroup.title}
                </h3>
                <p className="mt-2 text-xs font-medium text-fd-muted-foreground uppercase tracking-wider">
                  {detail.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fd-muted-foreground sm:text-base">
                  {selectedGroup.description}
                </p>

                {/* 3 Chỉ số kỹ thuật SLA */}
                <div className="mt-6 grid grid-cols-3 gap-3 border-y border-fd-border/70 py-4">
                  {detail.metrics.map((m) => (
                    <div key={m.label}>
                      <p className={`text-base font-bold sm:text-lg ${color.accentText}`}>
                        {m.value}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium text-fd-muted-foreground">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tags sản phẩm thành phần */}
                <div className="mt-5">
                  <p className="text-xs font-semibold text-fd-muted-foreground">
                    Sản phẩm tiêu biểu trong nhóm:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selectedGroup.products.map((prod) => (
                      <a
                        key={prod.name}
                        href={prod.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-fd-border bg-fd-background/70 px-2.5 py-1 text-xs font-medium text-fd-foreground transition-all hover:border-fd-primary hover:bg-fd-accent"
                      >
                        {prod.name}
                        <ArrowUpRight className="size-3 text-fd-muted-foreground" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {detail.docsHref ? (
                  <>
                    <Link
                      href={detail.docsHref}
                      className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    >
                      {detail.docsLabel || 'Mở tài liệu'} <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                    <a
                      href={selectedGroup.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-fd-border bg-fd-background px-4 py-2.5 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-accent"
                    >
                      Chi tiết giải pháp ods.vn <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </>
                ) : (
                  <a
                    href={selectedGroup.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-fd-primary px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground shadow-sm transition-all hover:opacity-90"
                  >
                    Khám phá giải pháp trên ods.vn <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            {/* Cột phải: Danh mục giải pháp & Tính năng cốt lõi (Key Capabilities & Components) */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-fd-border/80 bg-zinc-950 p-6 text-zinc-100 shadow-2xl">
              <div>
                {/* Header card bên phải */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold tracking-wider text-zinc-200 uppercase">
                      Danh mục giải pháp &amp; Tính năng cốt lõi
                    </span>
                  </div>
                  <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
                    {detail.badgeText}
                  </span>
                </div>

                {/* 3 Khối tính năng cốt lõi */}
                <div className="mt-5 space-y-3.5">
                  {detail.capabilities.map((cap) => {
                    const CapIcon = cap.icon;

                    return (
                      <div
                        key={cap.title}
                        className="group flex items-start gap-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-3.5 transition-colors hover:border-zinc-700 hover:bg-zinc-900/80"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-zinc-700 bg-zinc-800 text-sky-400 transition-transform group-hover:scale-105">
                          <CapIcon className="size-4" aria-hidden="true" />
                        </span>

                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-bold text-white">
                            {cap.title}
                          </h4>
                          <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                            {cap.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer card bên phải */}
              <div className="mt-6 flex items-center justify-between rounded-xl bg-zinc-900 px-3.5 py-2.5 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <Sparkles className="size-3.5 text-amber-400" aria-hidden="true" />
                  Tiêu chuẩn triển khai ODS
                </span>
                <a
                  href={selectedGroup.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sky-400 transition-colors hover:text-sky-300"
                >
                  ods.vn ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
