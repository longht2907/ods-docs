import React from 'react';

export function ApiArchitectureOverview() {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card/50 shadow-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-sky-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-fd-foreground">
            Kiến trúc tích hợp tổng thể (Integration Architecture)
          </span>
        </div>
        <span className="hidden sm:inline-block font-mono text-[11px] text-fd-muted-foreground">
          Frontend ⟷ Backend ⟷ ODS Cloud ⟷ Telco
        </span>
      </div>

      {/* SVG Canvas */}
      <div className="p-3 sm:p-5 overflow-x-auto">
        <svg
          viewBox="0 0 680 330"
          className="w-full h-auto min-w-[580px] text-fd-foreground select-none"
          style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}
        >
          <defs>
            <marker
              id="arch-arrow"
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
              id="arch-arrow-sky"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <polygon points="0 1, 7 4, 0 7" className="fill-sky-500" />
            </marker>
            <marker
              id="arch-arrow-purple"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <polygon points="0 1, 7 4, 0 7" className="fill-purple-500" />
            </marker>
          </defs>

          {/* ================= ZONE 1: CUSTOMER SYSTEM ================= */}
          <rect x="10" y="10" width="220" height="310" rx="8" className="fill-fd-muted/20 stroke-fd-border" strokeDasharray="4 4" strokeWidth="1" />
          <text x="22" y="28" className="text-[11px] font-bold uppercase tracking-wider fill-fd-foreground">Hệ thống Doanh nghiệp</text>

          {/* Subbox 1: Frontend */}
          <g transform="translate(20, 42)">
            <rect width="200" height="96" rx="6" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <text x="12" y="20" className="text-[11px] font-semibold fill-sky-600 dark:fill-sky-400">1. Trình duyệt / CRM UI (Frontend)</text>
            <text x="12" y="38" className="text-[10px] fill-fd-muted-foreground">• Nút bấm "Gọi" (Gửi lệnh về CRM)</text>
            <text x="12" y="54" className="text-[10px] fill-fd-muted-foreground">• Nhận Popup thông tin khách gọi đến</text>
            <text x="12" y="70" className="text-[10px] fill-fd-muted-foreground">• [Tùy chọn WebRTC] Nghe/gọi qua mic & loa</text>
            <text x="12" y="86" className="text-[9.5px] font-semibold text-rose-500 fill-rose-600 dark:fill-rose-400">⚠️ Không chứa AuthKey tại client</text>
          </g>

          {/* Subbox 2: Backend */}
          <g transform="translate(20, 154)">
            <rect width="200" height="152" rx="6" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <text x="12" y="20" className="text-[11px] font-semibold fill-amber-600 dark:fill-amber-400">2. Máy chủ CRM / ERP (Backend)</text>
            <text x="12" y="38" className="text-[10px] fill-fd-muted-foreground">• Lưu trữ an toàn: AuthKey, AuthUser</text>
            <text x="12" y="54" className="text-[10px] fill-fd-muted-foreground">• Gọi REST API điều khiển (Click-to-Call)</text>
            <text x="12" y="70" className="text-[10px] fill-fd-muted-foreground">• Webhook Receiver: Nhận sự kiện cuộc gọi</text>
            <text x="12" y="86" className="text-[10px] fill-fd-muted-foreground">• Lưu lịch sử, đồng bộ CRM, ghi âm</text>
            <text x="12" y="106" className="text-[9.5px] font-mono fill-fd-muted-foreground bg-fd-muted px-1.5 py-0.5">Node.js / Python / PHP / Java</text>
          </g>

          {/* ================= ZONE 2: ODS CLOUD ================= */}
          <rect x="250" y="10" width="220" height="310" rx="8" className="fill-purple-500/5 stroke-purple-500/30" strokeWidth="1.2" />
          <text x="262" y="28" className="text-[11px] font-bold uppercase tracking-wider fill-purple-700 dark:fill-purple-300">Tổng đài ODS Cloud</text>

          <g transform="translate(260, 42)">
            <rect width="200" height="264" rx="6" className="fill-fd-card stroke-purple-500/20" strokeWidth="1" />
            
            <text x="12" y="22" className="text-[11px] font-semibold fill-purple-700 dark:fill-purple-300">API Gateway & PBX Engine</text>
            <text x="12" y="38" className="text-[9.5px] font-mono fill-fd-muted-foreground">https://api.ods.vn</text>

            <line x1="12" y1="48" x2="188" y2="48" stroke="currentColor" strokeOpacity="0.1" />

            <text x="12" y="66" className="text-[10px] font-semibold fill-fd-foreground">• REST Controller:</text>
            <text x="20" y="82" className="text-[9.5px] fill-fd-muted-foreground">Xác thực AuthUser, AuthKey</text>
            <text x="20" y="96" className="text-[9.5px] fill-fd-muted-foreground">Khởi tạo cuộc gọi, quản lý Ext</text>

            <text x="12" y="118" className="text-[10px] font-semibold fill-fd-foreground">• Webhook Dispatcher:</text>
            <text x="20" y="134" className="text-[9.5px] fill-fd-muted-foreground">Bắn Popup & sự kiện về CRM</text>

            <text x="12" y="156" className="text-[10px] font-semibold fill-fd-foreground">• PBX Signaling & Audio Core:</text>
            <text x="20" y="172" className="text-[9.5px] fill-fd-muted-foreground">Định tuyến máy nhánh, IVR, Queue</text>
            <text x="20" y="186" className="text-[9.5px] fill-fd-muted-foreground">Ghi âm cuộc gọi, tính cước CDR</text>

            <text x="12" y="208" className="text-[10px] font-semibold fill-fd-foreground">• WebRTC / WSS Gateway:</text>
            <text x="20" y="224" className="text-[9.5px] fill-fd-muted-foreground">SIP over WSS (JsSIP Client)</text>
            
            <text x="12" y="248" className="text-[10px] font-semibold fill-emerald-600 dark:text-emerald-400">• Autocall Gateway (apiai):</text>
            <text x="20" y="260" className="text-[9.5px] fill-fd-muted-foreground">Phát thông báo TTS tự động</text>
          </g>

          {/* ================= ZONE 3: TELCO & CUSTOMER ================= */}
          <rect x="490" y="10" width="180" height="310" rx="8" className="fill-emerald-500/5 stroke-emerald-500/30" strokeWidth="1" />
          <text x="502" y="28" className="text-[11px] font-bold uppercase tracking-wider fill-emerald-700 dark:fill-emerald-300">Nhà mạng & Khách hàng</text>

          <g transform="translate(500, 42)">
            <rect width="160" height="110" rx="6" className="fill-fd-card stroke-emerald-500/20" strokeWidth="1" />
            <text x="12" y="22" className="text-[11px] font-semibold fill-emerald-700 dark:fill-emerald-300">Trunk Viễn thông</text>
            <text x="12" y="40" className="text-[10px] fill-fd-muted-foreground">• Đầu số 1800 / 1900</text>
            <text x="12" y="56" className="text-[10px] fill-fd-muted-foreground">• Đầu số cố định (028 / 024)</text>
            <text x="12" y="72" className="text-[10px] fill-fd-muted-foreground">• Hotline di động Voice Brandname</text>
            <text x="12" y="92" className="text-[9.5px] fill-fd-muted-foreground">Kết nối PSTN nhà mạng</text>
          </g>

          <g transform="translate(500, 168)">
            <rect width="160" height="138" rx="6" className="fill-fd-card stroke-emerald-500/20" strokeWidth="1" />
            <text x="12" y="22" className="text-[11px] font-semibold fill-emerald-700 dark:fill-emerald-300">Khách hàng cuối</text>
            <text x="12" y="40" className="text-[10px] fill-fd-muted-foreground">• Thuê bao di động / Bàn</text>
            <text x="12" y="56" className="text-[10px] fill-fd-muted-foreground">• Nhận cuộc gọi Click-to-Call</text>
            <text x="12" y="72" className="text-[10px] fill-fd-muted-foreground">• Nghe thông báo Autocall</text>
            <text x="12" y="88" className="text-[10px] fill-fd-muted-foreground">• Gọi đến tổng đài (Inbound)</text>
            <text x="12" y="112" className="text-[9.5px] font-mono fill-fd-muted-foreground bg-fd-muted px-1.5 py-0.5">PhoneNumber</text>
          </g>

          {/* ================= FLOW ARROWS ================= */}
          {/* Arrow 1: CRM Backend -> ODS REST API */}
          <line x1="220" y1="210" x2="252" y2="210" className="stroke-amber-500" strokeWidth="1.8" markerEnd="url(#arch-arrow)" />

          {/* Arrow 2: ODS Webhook -> CRM Backend */}
          <line x1="250" y1="245" x2="228" y2="245" className="stroke-purple-500" strokeWidth="1.8" strokeDasharray="4 2" markerEnd="url(#arch-arrow-purple)" />

          {/* Arrow 3: Frontend WebRTC -> ODS */}
          <line x1="220" y1="85" x2="252" y2="85" className="stroke-sky-500" strokeWidth="1.8" strokeDasharray="3 3" markerEnd="url(#arch-arrow-sky)" />

          {/* Arrow 4: ODS -> Telco Trunk */}
          <line x1="470" y1="95" x2="492" y2="95" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#arch-arrow)" />

          {/* Arrow 5: Trunk -> Customer */}
          <line x1="580" y1="152" x2="580" y2="162" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#arch-arrow)" />
        </svg>
      </div>

      {/* Legend footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x border-t border-fd-border bg-fd-muted/20 text-xs">
        <div className="p-3">
          <div className="flex items-center gap-1.5 font-semibold text-amber-600 dark:text-amber-400">
            <span className="size-2 rounded-full bg-amber-500" />
            <span>REST API (CRM Backend ➔ ODS)</span>
          </div>
          <p className="mt-1 text-[11px] text-fd-muted-foreground leading-relaxed">
            Chỉ gọi từ Server-side để bảo vệ <code className="font-mono text-fd-foreground">AuthKey</code>. Dùng để ra lệnh gọi, đồng bộ danh bạ, lấy lịch sử.
          </p>
        </div>
        <div className="p-3">
          <div className="flex items-center gap-1.5 font-semibold text-purple-600 dark:text-purple-400">
            <span className="size-2 rounded-full bg-purple-500" />
            <span>Webhook (ODS ➔ CRM Receiver)</span>
          </div>
          <p className="mt-1 text-[11px] text-fd-muted-foreground leading-relaxed">
            Tổng đài bắn HTTP POST sang backend khách hàng khi chuông reo (Ringing) hoặc nhấc máy (Up) để bật Popup realtime.
          </p>
        </div>
        <div className="p-3">
          <div className="flex items-center gap-1.5 font-semibold text-sky-600 dark:text-sky-400">
            <span className="size-2 rounded-full bg-sky-500" />
            <span>WebRTC (Trình duyệt ⟷ ODS)</span>
          </div>
          <p className="mt-1 text-[11px] text-fd-muted-foreground leading-relaxed">
            Truyền tải âm thanh giọng nói trực tiếp qua giao thức SIP over WSS (JsSIP). REST API không truyền âm thanh đàm thoại.
          </p>
        </div>
      </div>
    </div>
  );
}
