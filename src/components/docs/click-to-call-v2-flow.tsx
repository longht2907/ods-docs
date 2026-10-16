import React from 'react';

export function ClickToCallV2Flow() {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card/50 shadow-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-sky-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-fd-foreground">
            Sơ đồ tuần tự Click-to-Call V2 (Đảo hướng gọi khách trước)
          </span>
        </div>
        <span className="hidden sm:inline-block font-mono text-[11px] text-fd-muted-foreground">
          Gọi khách trước ➔ Chuyển tiếp Inbound Route
        </span>
      </div>

      {/* Diagram Area */}
      <div className="p-3 sm:p-5">
        <svg
          viewBox="0 0 560 425"
          className="w-full h-auto text-fd-foreground select-none"
          style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}
        >
          <defs>
            <marker
              id="c2c-v2-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <polygon points="0 1, 7 4, 0 7" fill="currentColor" />
            </marker>
            <marker
              id="c2c-v2-arrow-muted"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <polygon points="0 1, 7 4, 0 7" className="fill-fd-muted-foreground" />
            </marker>
          </defs>

          {/* 4 Lifelines */}
          <line x1="65" y1="46" x2="65" y2="415" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="3 3" strokeWidth="1.2" />
          <line x1="205" y1="46" x2="205" y2="415" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="3 3" strokeWidth="1.2" />
          <line x1="355" y1="46" x2="355" y2="415" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="3 3" strokeWidth="1.2" />
          <line x1="495" y1="46" x2="495" y2="415" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="3 3" strokeWidth="1.2" />

          {/* Actor 1: CRM */}
          <g transform="translate(15, 10)">
            <rect width="100" height="36" rx="6" className="fill-fd-muted/80 stroke-fd-border" strokeWidth="1.2" />
            <text x="50" y="18" textAnchor="middle" className="text-[11px] font-semibold fill-fd-foreground">CRM / ERP</text>
            <text x="50" y="29" textAnchor="middle" className="text-[9px] fill-fd-muted-foreground">Khởi tạo lệnh gọi</text>
          </g>

          {/* Actor 2: ODS PBX */}
          <g transform="translate(155, 10)">
            <rect width="100" height="36" rx="6" className="fill-fd-muted/80 stroke-fd-border" strokeWidth="1.2" />
            <text x="50" y="18" textAnchor="middle" className="text-[11px] font-semibold fill-fd-foreground">Tổng đài ODS</text>
            <text x="50" y="29" textAnchor="middle" className="text-[9px] fill-fd-muted-foreground">Điều phối viễn thông</text>
          </g>

          {/* Actor 3: Khách hàng */}
          <g transform="translate(305, 10)">
            <rect width="100" height="36" rx="6" className="fill-fd-muted/80 stroke-fd-border" strokeWidth="1.2" />
            <text x="50" y="18" textAnchor="middle" className="text-[11px] font-semibold fill-fd-foreground">Khách hàng</text>
            <text x="50" y="29" textAnchor="middle" className="text-[9px] fill-fd-muted-foreground">Nhận cuộc gọi trước</text>
          </g>

          {/* Actor 4: Inbound Route */}
          <g transform="translate(445, 10)">
            <rect width="100" height="36" rx="6" className="fill-fd-muted/80 stroke-fd-border" strokeWidth="1.2" />
            <text x="50" y="18" textAnchor="middle" className="text-[11px] font-semibold fill-fd-foreground">Inbound Route</text>
            <text x="50" y="29" textAnchor="middle" className="text-[9px] fill-fd-muted-foreground">IVR / Hàng đợi Ext</text>
          </g>

          {/* ================= STEP 1 ================= */}
          <line x1="65" y1="80" x2="197" y2="80" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#c2c-v2-arrow)" />
          <circle cx="82" cy="80" r="7.5" fill="currentColor" />
          <text x="82" y="83.5" textAnchor="middle" className="fill-fd-background text-[9px] font-bold">1</text>
          <text x="96" y="76" className="text-[11px] font-semibold fill-fd-foreground font-mono">POST /api/CloudFone/AutoCallV2</text>

          {/* ================= STEP 2 ================= */}
          <line x1="205" y1="116" x2="73" y2="116" className="stroke-fd-muted-foreground" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#c2c-v2-arrow-muted)" />
          <circle cx="188" cy="116" r="7.5" className="fill-fd-muted-foreground" />
          <text x="188" y="119.5" textAnchor="middle" className="fill-fd-background text-[9px] font-bold">2</text>
          <text x="96" y="112" className="text-[10px] font-mono font-medium fill-fd-foreground">200 OK {"{ result: \"success\", keySearch }"}</text>

          {/* Note Step 2 */}
          <g transform="translate(25, 132)">
            <rect width="220" height="20" rx="4" className="fill-fd-muted/60 stroke-fd-border" strokeWidth="1" />
            <text x="110" y="14" textAnchor="middle" className="text-[9.5px] fill-fd-muted-foreground">
              ⚡ Bất đồng bộ: Nhận lệnh ngay, chưa gọi ai
            </text>
          </g>

          {/* Divider: Chặng 1 */}
          <g transform="translate(210, 168)">
            <rect width="230" height="18" rx="4" className="fill-sky-500/10 stroke-sky-500/30" strokeWidth="1" />
            <text x="115" y="12.5" textAnchor="middle" className="text-[9.5px] font-bold fill-sky-700 dark:fill-sky-300 uppercase tracking-wider">
              Chặng 1: Gọi số khách hàng trước
            </text>
          </g>

          {/* ================= STEP 3 ================= */}
          <line x1="205" y1="208" x2="347" y2="208" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#c2c-v2-arrow)" />
          <circle cx="222" cy="208" r="7.5" fill="currentColor" />
          <text x="222" y="211.5" textAnchor="middle" className="fill-fd-background text-[9px] font-bold">3</text>
          <text x="236" y="204" className="text-[10.5px] font-medium fill-fd-foreground">Quay số gọi khách (PhoneNumber)</text>

          {/* ================= STEP 4 ================= */}
          <line x1="355" y1="242" x2="213" y2="242" className="stroke-fd-muted-foreground" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#c2c-v2-arrow-muted)" />
          <circle cx="338" cy="242" r="7.5" className="fill-fd-muted-foreground" />
          <text x="338" y="245.5" textAnchor="middle" className="fill-fd-background text-[9px] font-bold">4</text>
          <text x="236" y="238" className="text-[10.5px] font-semibold fill-sky-700 dark:fill-sky-300">Khách hàng nhấc máy (Answered)</text>

          {/* Divider: Chặng 2 */}
          <g transform="translate(210, 268)">
            <rect width="230" height="18" rx="4" className="fill-emerald-500/10 stroke-emerald-500/30" strokeWidth="1" />
            <text x="115" y="12.5" textAnchor="middle" className="text-[9.5px] font-bold fill-emerald-700 dark:fill-emerald-300 uppercase tracking-wider">
              Chặng 2: Chuyển tiếp Inbound Route
            </text>
          </g>

          {/* ================= STEP 5 ================= */}
          <line x1="205" y1="308" x2="487" y2="308" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#c2c-v2-arrow)" />
          <circle cx="222" cy="308" r="7.5" fill="currentColor" />
          <text x="222" y="311.5" textAnchor="middle" className="fill-fd-background text-[9px] font-bold">5</text>
          <text x="236" y="304" className="text-[10.5px] font-medium fill-fd-foreground">Định tuyến vào Inbound Route / IVR (Ext)</text>

          {/* ================= STEP 6 ================= */}
          <line x1="495" y1="342" x2="213" y2="342" className="stroke-fd-muted-foreground" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#c2c-v2-arrow-muted)" />
          <circle cx="478" cy="342" r="7.5" className="fill-fd-muted-foreground" />
          <text x="478" y="345.5" textAnchor="middle" className="fill-fd-background text-[9px] font-bold">6</text>
          <text x="236" y="338" className="text-[10.5px] font-semibold fill-emerald-700 dark:fill-emerald-300">Nhân viên trực / IVR tiếp nhận</text>

          {/* ================= STEP 7: Audio Bridge ================= */}
          <g transform="translate(305, 372)">
            <rect width="190" height="32" rx="6" className="fill-emerald-500/15 stroke-emerald-500/40" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="8" className="fill-emerald-600 dark:fill-emerald-400" />
            <text x="16" y="19.5" textAnchor="middle" className="fill-white dark:fill-slate-900 text-[9px] font-bold">7</text>
            <text x="32" y="15" className="text-[10.5px] font-bold fill-emerald-800 dark:fill-emerald-200">Nối thoại đàm thoại</text>
            <text x="32" y="26" className="text-[9px] fill-fd-muted-foreground">Khách hàng ⟷ Hàng đợi / IVR</text>
          </g>
        </svg>
      </div>

      {/* 3 Principles for Devs */}
      <div className="grid grid-cols-1 border-t border-fd-border bg-fd-muted/20 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-fd-border text-xs">
        <div className="p-3">
          <div className="font-semibold text-fd-foreground">1. Đảo chiều gọi khách trước</div>
          <p className="mt-1 text-[11px] text-fd-muted-foreground leading-relaxed">
            Khác với V1, V2 gọi tới số khách hàng trước. Khách hàng bắt máy thì cuộc gọi mới được chuyển tiếp vào tổng đài.
          </p>
        </div>
        <div className="p-3">
          <div className="font-semibold text-fd-foreground">2. Tham số Ext là Route</div>
          <p className="mt-1 text-[11px] text-fd-muted-foreground leading-relaxed">
            Trường <code className="font-mono text-fd-foreground font-semibold">Ext</code> trong V2 không phải số máy nhánh cá nhân, mà là tên Inbound Route đã cấu hình.
          </p>
        </div>
        <div className="p-3">
          <div className="font-semibold text-fd-foreground">3. Cú pháp PhoneNumber</div>
          <p className="mt-1 text-[11px] text-fd-muted-foreground leading-relaxed">
            Phải truyền theo định dạng <code className="font-mono text-fd-foreground font-semibold">&lt;Tên_Trunk&gt;/&lt;Số_khách&gt;</code> để chỉ định đầu số gọi ra.
          </p>
        </div>
      </div>
    </div>
  );
}
