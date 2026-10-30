import React from 'react';

/**
 * WebhookArchitectureDiagram
 * Sơ đồ luồng đẩy sự kiện Webhook từ Tổng đài ODS đến Backend và Frontend của doanh nghiệp.
 * Phân định:
 * 1. Tổng đài ODS (Event Producer) phát HTTP POST (JSON Metadata)
 * 2. Máy chủ CRM / ERP (Backend Receiver) tiếp nhận, kiểm tra apikey, trả HTTP 2xx
 * 3. Giao diện CRM (Frontend) nhận dữ liệu từ Backend và hiển thị Screen Pop-up
 */
export function WebhookArchitectureDiagram() {
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card/50 shadow-xs">
      <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-amber-500" />
          <figcaption className="text-xs font-semibold uppercase tracking-wider text-fd-foreground">
            Cơ chế đẩy sự kiện Webhook & Ranh giới xử lý Popup
          </figcaption>
        </div>
        <span className="hidden sm:inline-block font-mono text-[11px] text-fd-muted-foreground">
          ODS PBX (Push) ➔ Customer Backend (HTTP 2xx) ➔ CRM Frontend (Popup)
        </span>
      </div>

      <div className="p-3 sm:p-5 overflow-x-auto">
        <svg
          viewBox="0 0 760 260"
          className="w-full h-auto min-w-[660px] text-fd-foreground select-none"
          style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}
          role="img"
          aria-label="Sơ đồ cơ chế hoạt động Webhook từ tổng đài ODS đến hệ thống doanh nghiệp"
        >
          <defs>
            <marker
              id="webhook-arrow"
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
              id="webhook-arrow-amber"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <polygon points="0 1, 7 4, 0 7" className="fill-amber-500" />
            </marker>
            <marker
              id="webhook-arrow-sky"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <polygon points="0 1, 7 4, 0 7" className="fill-sky-500" />
            </marker>
          </defs>

          {/* ZONE 1: TỔNG ĐÀI ODS */}
          <g transform="translate(15, 16)">
            <rect width="215" height="180" rx="8" className="fill-purple-500/5 stroke-purple-500/30" strokeWidth="1.2" />
            <text x="14" y="24" className="text-[11px] font-bold uppercase tracking-wider fill-purple-700 dark:fill-purple-300">
              Tổng đài ODS (Sender)
            </text>
            <rect x="12" y="38" width="191" height="128" rx="6" className="fill-fd-card stroke-purple-500/20" strokeWidth="1" />
            <text x="22" y="58" className="text-[11px] font-semibold fill-purple-700 dark:fill-purple-300">
              PBX Event Engine
            </text>
            <text x="22" y="76" className="text-[10px] fill-fd-muted-foreground">• Phát hiện sự kiện cuộc gọi</text>
            <text x="22" y="92" className="text-[10px] fill-fd-muted-foreground">• Đóng gói JSON Metadata</text>
            <text x="22" y="108" className="text-[10px] fill-fd-muted-foreground">• Gửi HTTP POST tới Endpoint</text>
            <text x="22" y="124" className="text-[10px] fill-fd-muted-foreground">• Kèm field apikey (nếu có)</text>
            <rect x="22" y="134" width="171" height="22" rx="4" className="fill-purple-500/10" />
            <text x="107" y="149" textAnchor="middle" className="text-[9px] font-semibold fill-purple-700 dark:fill-purple-300">
              Cơ chế Đẩy (Event-driven Push)
            </text>
          </g>

          {/* ARROW 1: HTTP POST */}
          <path
            d="M 230 90 L 272 90"
            className="stroke-amber-500"
            strokeWidth="2.2"
            markerEnd="url(#webhook-arrow-amber)"
          />
          <rect x="232" y="66" width="40" height="18" rx="3" className="fill-fd-background/90 stroke-amber-500/30" strokeWidth="0.8" />
          <text x="252" y="79" textAnchor="middle" className="text-[8.5px] font-mono font-bold fill-amber-600 dark:fill-amber-400">
            POST
          </text>

          {/* ARROW 1 BACK: 2xx Response */}
          <path
            d="M 272 120 L 230 120"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#webhook-arrow)"
          />
          <text x="251" y="136" textAnchor="middle" className="text-[8.5px] font-mono fill-fd-muted-foreground">
            2xx OK
          </text>

          {/* ZONE 2: BACKEND DOANH NGHIỆP */}
          <g transform="translate(274, 16)">
            <rect width="235" height="180" rx="8" className="fill-amber-500/5 stroke-amber-500/30" strokeWidth="1.2" />
            <text x="14" y="24" className="text-[11px] font-bold uppercase tracking-wider fill-amber-700 dark:fill-amber-300">
              Máy chủ CRM/ERP (Receiver)
            </text>
            <rect x="12" y="38" width="211" height="128" rx="6" className="fill-fd-card stroke-amber-500/20" strokeWidth="1" />
            <text x="22" y="58" className="text-[11px] font-semibold fill-amber-700 dark:fill-amber-300">
              Endpoint tiếp nhận Webhook
            </text>
            <text x="22" y="74" className="text-[9.5px] font-mono fill-fd-muted-foreground">https://crm.example.com/api/...</text>
            <line x1="22" y1="82" x2="210" y2="82" stroke="currentColor" strokeOpacity="0.1" />
            <text x="22" y="98" className="text-[10px] fill-fd-muted-foreground">• Xác thực apikey trong body</text>
            <text x="22" y="114" className="text-[10px] fill-fd-muted-foreground">• Trả HTTP 2xx xác nhận nhận gói</text>
            <text x="22" y="130" className="text-[10px] fill-fd-muted-foreground">• Phân loại LID, Ext, Uid, Event</text>
            <text x="22" y="146" className="text-[10px] fill-fd-muted-foreground">• Bắn sự kiện tới Client nhân viên</text>
          </g>

          {/* ARROW 2: Backend to Frontend (SSE/Socket nội bộ của CRM) */}
          <path
            d="M 509 105 L 546 105"
            className="stroke-sky-500"
            strokeWidth="2"
            markerEnd="url(#webhook-arrow-sky)"
          />
          <text x="528" y="95" textAnchor="middle" className="text-[8.5px] font-mono fill-sky-600 dark:fill-sky-400">
            WS/SSE
          </text>

          {/* ZONE 3: FRONTEND CRM & POPUP */}
          <g transform="translate(548, 16)">
            <rect width="195" height="180" rx="8" className="fill-sky-500/5 stroke-sky-500/30" strokeWidth="1.2" />
            <text x="14" y="24" className="text-[11px] font-bold uppercase tracking-wider fill-sky-700 dark:fill-sky-300">
              Trình duyệt (Frontend)
            </text>
            <rect x="12" y="38" width="171" height="128" rx="6" className="fill-fd-card stroke-sky-500/20" strokeWidth="1" />
            <text x="20" y="58" className="text-[11px] font-semibold fill-sky-700 dark:fill-sky-300">
              Giao diện làm việc CRM
            </text>
            <text x="20" y="76" className="text-[10px] fill-fd-muted-foreground">• Nhận sự kiện 'show' theo Ext</text>
            <text x="20" y="92" className="text-[10px] fill-fd-muted-foreground">• Tra cứu hồ sơ theo CID</text>
            <rect x="18" y="104" width="159" height="52" rx="4" className="fill-sky-500/10 stroke-sky-500/40" strokeWidth="1" />
            <text x="24" y="122" className="text-[10px] font-bold fill-sky-700 dark:fill-sky-300">
              📱 Cửa sổ Popup Cuộc gọi
            </text>
            <text x="24" y="136" className="text-[9px] fill-fd-muted-foreground">Hiện tên khách, lịch sử tương tác</text>
            <text x="24" y="148" className="text-[9px] fill-fd-muted-foreground">Bấm nhận / Xem ghi chú</text>
          </g>

          {/* Bottom warning bar */}
          <g transform="translate(15, 206)">
            <rect width="728" height="42" rx="6" className="fill-fd-muted/30 stroke-fd-border" strokeWidth="1" />
            <text x="14" y="18" className="text-[10px] font-bold fill-amber-600 dark:fill-amber-400">
              ⚠️ Ranh giới công nghệ: Webhook chỉ truyền siêu dữ liệu (JSON Metadata), KHÔNG truyền âm thanh thoại.
            </text>
            <text x="14" y="32" className="text-[9.5px] fill-fd-muted-foreground">
              Luồng âm thanh đàm thoại truyền qua SIP/WebRTC riêng biệt; Popup CRM là tầng ứng dụng do phía doanh nghiệp chủ động xây dựng từ dữ liệu Webhook.
            </text>
          </g>
        </svg>
      </div>
    </figure>
  );
}

/**
 * WebhookMultiBranchDiagram
 * Sơ đồ cấu trúc định danh cuộc gọi đa nhánh (LID, Ext, Uid).
 * Thể hiện mối quan hệ 1 LID cấp cao bao trùm nhiều nhánh Ext và Uid viễn thông.
 */
export function WebhookMultiBranchDiagram() {
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card/50 shadow-xs">
      <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-purple-500" />
          <figcaption className="text-xs font-semibold uppercase tracking-wider text-fd-foreground">
            Mô hình định danh cuộc gọi đa nhánh (Session LID ⟷ Channel Uid)
          </figcaption>
        </div>
        <span className="hidden sm:inline-block font-mono text-[11px] text-fd-muted-foreground">
          LID (Session) ➔ Branches (Ext + Uid)
        </span>
      </div>

      <div className="p-3 sm:p-5 overflow-x-auto">
        <svg
          viewBox="0 0 760 250"
          className="w-full h-auto min-w-[660px] text-fd-foreground select-none"
          style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}
          role="img"
          aria-label="Sơ đồ định danh cuộc gọi đa nhánh LID và Uid"
        >
          {/* Header Block: LID (Cuộc gọi tổng thể) */}
          <g transform="translate(180, 12)">
            <rect width="400" height="54" rx="8" className="fill-purple-500/10 stroke-purple-500/50" strokeWidth="1.6" />
            <text x="200" y="22" textAnchor="middle" className="text-[11.5px] font-bold fill-purple-700 dark:fill-purple-300">
              Phiên cuộc gọi tổng thể (Linked ID - LID)
            </text>
            <text x="200" y="40" textAnchor="middle" className="text-[10px] font-mono font-semibold fill-fd-foreground">
              LID = "1792051050.26559" (Dùng chung cho toàn bộ sự kiện)
            </text>
          </g>

          {/* Fork Lines down to 4 branches */}
          <path
            d="M 380 66 L 380 94"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M 98 94 L 662 94"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />

          {/* Vertical drops to each card */}
          <line x1="98" y1="94" x2="98" y2="108" stroke="currentColor" strokeWidth="1.5" />
          <line x1="286" y1="94" x2="286" y2="108" stroke="currentColor" strokeWidth="1.5" />
          <line x1="474" y1="94" x2="474" y2="108" stroke="currentColor" strokeWidth="1.5" />
          <line x1="662" y1="94" x2="662" y2="108" stroke="currentColor" strokeWidth="1.5" />

          {/* Branch 1 */}
          <g transform="translate(14, 110)">
            <rect width="168" height="126" rx="6" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <rect width="168" height="26" rx="6" className="fill-fd-muted/50" />
            <text x="12" y="18" className="text-[10.5px] font-bold fill-fd-foreground">Nhánh 1 (Ext 7875)</text>
            <text x="12" y="44" className="text-[9.5px] font-mono fill-fd-muted-foreground">Uid: .26568</text>
            <line x1="12" y1="54" x2="156" y2="54" stroke="currentColor" strokeOpacity="0.1" />
            <text x="12" y="70" className="text-[9.5px] fill-fd-muted-foreground">1. 'show' đổ chuông</text>
            <text x="12" y="86" className="text-[9.5px] fill-amber-600 dark:fill-amber-400">2. 'hide' dừng chuông</text>
            <text x="12" y="102" className="text-[8.5px] font-mono fill-fd-muted-foreground">ANSWERED_ELSEWHERE</text>
            <text x="12" y="118" className="text-[8.5px] fill-fd-muted-foreground">Không phải khách nhỡ</text>
          </g>

          {/* Branch 2 (Answered) */}
          <g transform="translate(202, 110)">
            <rect width="168" height="126" rx="6" className="fill-emerald-500/5 stroke-emerald-500/50" strokeWidth="1.6" />
            <rect width="168" height="26" rx="6" className="fill-emerald-500/20" />
            <text x="12" y="18" className="text-[10.5px] font-bold fill-emerald-700 dark:fill-emerald-300">Nhánh 2 (Ext 7877) ★</text>
            <text x="12" y="44" className="text-[9.5px] font-mono font-semibold fill-fd-foreground">Uid: .26564</text>
            <line x1="12" y1="54" x2="156" y2="54" stroke="currentColor" strokeOpacity="0.1" />
            <text x="12" y="70" className="text-[9.5px] fill-fd-muted-foreground">1. 'show' đổ chuông</text>
            <text x="12" y="86" className="text-[9.5px] font-bold fill-emerald-600 dark:fill-emerald-400">2. 'answer' nhấc máy</text>
            <text x="12" y="102" className="text-[9.5px] font-bold fill-emerald-600 dark:fill-emerald-400">3. 'finish' đàm thoại</text>
            <text x="12" y="118" className="text-[8.5px] font-mono fill-emerald-700 dark:fill-emerald-300">Trạng thái: ANSWERED</text>
          </g>

          {/* Branch 3 */}
          <g transform="translate(390, 110)">
            <rect width="168" height="126" rx="6" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <rect width="168" height="26" rx="6" className="fill-fd-muted/50" />
            <text x="12" y="18" className="text-[10.5px] font-bold fill-fd-foreground">Nhánh 3 (Ext 7874)</text>
            <text x="12" y="44" className="text-[9.5px] font-mono fill-fd-muted-foreground">Uid: .26562</text>
            <line x1="12" y1="54" x2="156" y2="54" stroke="currentColor" strokeOpacity="0.1" />
            <text x="12" y="70" className="text-[9.5px] fill-fd-muted-foreground">1. 'show' đổ chuông</text>
            <text x="12" y="86" className="text-[9.5px] fill-amber-600 dark:fill-amber-400">2. 'hide' dừng chuông</text>
            <text x="12" y="102" className="text-[8.5px] font-mono fill-fd-muted-foreground">ANSWERED_ELSEWHERE</text>
            <text x="12" y="118" className="text-[8.5px] fill-fd-muted-foreground">Máy khác đã bắt máy</text>
          </g>

          {/* Branch 4 */}
          <g transform="translate(578, 110)">
            <rect width="168" height="126" rx="6" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <rect width="168" height="26" rx="6" className="fill-fd-muted/50" />
            <text x="12" y="18" className="text-[10.5px] font-bold fill-fd-foreground">Nhánh 4 (Ext 7873)</text>
            <text x="12" y="44" className="text-[9.5px] font-mono fill-fd-muted-foreground">Uid: .26566</text>
            <line x1="12" y1="54" x2="156" y2="54" stroke="currentColor" strokeOpacity="0.1" />
            <text x="12" y="70" className="text-[9.5px] fill-fd-muted-foreground">1. 'show' đổ chuông</text>
            <text x="12" y="86" className="text-[9.5px] fill-amber-600 dark:fill-amber-400">2. 'hide' dừng chuông</text>
            <text x="12" y="102" className="text-[8.5px] font-mono fill-fd-muted-foreground">ANSWERED_ELSEWHERE</text>
            <text x="12" y="118" className="text-[8.5px] fill-fd-muted-foreground">Tắt chuông tự động</text>
          </g>
        </svg>
      </div>
    </figure>
  );
}

/**
 * WebhookLifecycleDiagram
 * Sơ đồ luồng sự kiện Webhook cho 2 kịch bản:
 * - Kịch bản A: Cuộc gọi ra (Outbound) thành công
 * - Kịch bản B: Cuộc gọi vào (Inbound Ring Group)
 */
export function WebhookLifecycleDiagram({ scenario }: { scenario: 'outbound' | 'inbound' }) {
  if (scenario === 'outbound') {
    return (
      <figure className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card/50 shadow-xs">
        <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted/40 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" />
            <figcaption className="text-xs font-semibold uppercase tracking-wider text-fd-foreground">
              Tiến trình 4 sự kiện cuộc gọi ra (Outbound Call)
            </figcaption>
          </div>
          <span className="hidden sm:inline-block font-mono text-[11px] text-fd-muted-foreground">
            register ➔ show ➔ answer ➔ finish
          </span>
        </div>

        <div className="p-3 sm:p-5 overflow-x-auto">
          <svg
            viewBox="0 0 760 160"
            className="w-full h-auto min-w-[660px] text-fd-foreground select-none"
            style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}
            role="img"
            aria-label="Sơ đồ 4 bước sự kiện cuộc gọi ra"
          >
            <defs>
              <marker
                id="outbound-arrow"
                viewBox="0 0 8 8"
                refX="7"
                refY="4"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <polygon points="0 1, 7 4, 0 7" fill="currentColor" />
              </marker>
            </defs>

            {/* Step 1: register */}
            <g transform="translate(10, 16)">
              <rect width="168" height="126" rx="8" className="fill-fd-card stroke-sky-500/40" strokeWidth="1.4" />
              <rect width="168" height="28" rx="8" className="fill-sky-500/10" />
              <text x="14" y="19" className="text-[11px] font-bold fill-sky-700 dark:fill-sky-300">1. register</text>
              <text x="12" y="44" className="text-[10px] font-semibold fill-fd-foreground">Khởi tạo gọi ra:</text>
              <text x="12" y="60" className="text-[9.5px] fill-fd-muted-foreground">• Tạo LID và Uid</text>
              <text x="12" y="74" className="text-[9.5px] fill-fd-muted-foreground">• Ghi nhận TimeCall</text>
              <text x="12" y="88" className="text-[9.5px] fill-fd-muted-foreground">• Máy nhánh Ext bấm gọi</text>
              <text x="12" y="112" className="text-[9px] font-medium fill-amber-600 dark:fill-amber-400">Chưa có TimeAnswer</text>
            </g>

            {/* Arrow 1 -> 2 */}
            <line x1="180" y1="79" x2="198" y2="79" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#outbound-arrow)" />

            {/* Step 2: show */}
            <g transform="translate(200, 16)">
              <rect width="168" height="126" rx="8" className="fill-fd-card stroke-indigo-500/40" strokeWidth="1.4" />
              <rect width="168" height="28" rx="8" className="fill-indigo-500/10" />
              <text x="14" y="19" className="text-[11px] font-bold fill-indigo-700 dark:fill-indigo-300">2. show</text>
              <text x="12" y="44" className="text-[10px] font-semibold fill-fd-foreground">Khách đổ chuông:</text>
              <text x="12" y="60" className="text-[9.5px] fill-fd-muted-foreground">• Ghi nhận TimeDial</text>
              <text x="12" y="74" className="text-[9.5px] fill-fd-muted-foreground">• CID: Số thuê bao khách</text>
              <text x="12" y="88" className="text-[9.5px] fill-fd-muted-foreground">• DID: Hotline hiển thị</text>
              <text x="12" y="112" className="text-[9px] font-medium fill-indigo-600 dark:fill-indigo-400">Đang reo chuông đối phương</text>
            </g>

            {/* Arrow 2 -> 3 */}
            <line x1="370" y1="79" x2="388" y2="79" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#outbound-arrow)" />

            {/* Step 3: answer */}
            <g transform="translate(390, 16)">
              <rect width="168" height="126" rx="8" className="fill-fd-card stroke-amber-500/40" strokeWidth="1.4" />
              <rect width="168" height="28" rx="8" className="fill-amber-500/10" />
              <text x="14" y="19" className="text-[11px] font-bold fill-amber-700 dark:fill-amber-300">3. answer</text>
              <text x="12" y="44" className="text-[10px] font-semibold fill-fd-foreground">Khách nhấc máy:</text>
              <text x="12" y="60" className="text-[9.5px] fill-fd-muted-foreground">• Ghi nhận TimeAnswer</text>
              <text x="12" y="74" className="text-[9.5px] fill-fd-muted-foreground">• Bắt đầu tính đàm thoại</text>
              <text x="12" y="88" className="text-[9.5px] fill-fd-muted-foreground">• Kênh thoại kết nối 2 bên</text>
              <text x="12" y="112" className="text-[9px] font-medium fill-emerald-600 dark:fill-emerald-400">Đang đàm thoại (Active)</text>
            </g>

            {/* Arrow 3 -> 4 */}
            <line x1="560" y1="79" x2="578" y2="79" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#outbound-arrow)" />

            {/* Step 4: finish */}
            <g transform="translate(580, 16)">
              <rect width="170" height="126" rx="8" className="fill-emerald-500/5 stroke-emerald-500/50" strokeWidth="1.6" />
              <rect width="170" height="28" rx="8" className="fill-emerald-500/20" />
              <text x="14" y="19" className="text-[11px] font-bold fill-emerald-700 dark:fill-emerald-300">4. finish</text>
              <text x="12" y="44" className="text-[10px] font-semibold fill-emerald-700 dark:fill-emerald-300">Gác máy & Chốt cước:</text>
              <text x="12" y="60" className="text-[9.5px] fill-fd-muted-foreground">• TimeEnd, Disposition: ANSWERED</text>
              <text x="12" y="74" className="text-[9.5px] fill-fd-muted-foreground">• recordingfileURL (Link ghi âm)</text>
              <text x="12" y="88" className="text-[9.5px] fill-fd-muted-foreground">• Thời lượng = TimeEnd - TimeAnswer</text>
              <text x="12" y="112" className="text-[9px] font-bold fill-emerald-600 dark:fill-emerald-400">Không phát sinh sự kiện 'hide'</text>
            </g>
          </svg>
        </div>
      </figure>
    );
  }

  // Inbound Ring Group Scenario
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card/50 shadow-xs">
      <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-sky-500" />
          <figcaption className="text-xs font-semibold uppercase tracking-wider text-fd-foreground">
            Luồng sự kiện cuộc gọi vào nhóm máy nhánh (Inbound Ring Group)
          </figcaption>
        </div>
        <span className="hidden sm:inline-block font-mono text-[11px] text-fd-muted-foreground">
          register ➔ 4x show ➔ 1x answer ➔ 3x hide ➔ finish
        </span>
      </div>

      <div className="p-3 sm:p-5 overflow-x-auto">
        <svg
          viewBox="0 0 760 300"
          className="w-full h-auto min-w-[660px] text-fd-foreground select-none"
          style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}
          role="img"
          aria-label="Sơ đồ luồng sự kiện cuộc gọi vào đổ chuông nhóm máy nhánh"
        >
          <defs>
            <marker
              id="inbound-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <polygon points="0 1, 7 4, 0 7" fill="currentColor" />
            </marker>
          </defs>

          {/* Step 1: register */}
          <g transform="translate(12, 110)">
            <rect width="140" height="80" rx="6" className="fill-fd-card stroke-sky-500/40" strokeWidth="1.4" />
            <text x="10" y="20" className="text-[11px] font-bold fill-sky-700 dark:fill-sky-300">1. register</text>
            <text x="10" y="38" className="text-[9.5px] fill-fd-muted-foreground">Khách gọi vào Hotline</text>
            <text x="10" y="52" className="text-[9.5px] fill-fd-muted-foreground">Khởi tạo phiên LID</text>
            <text x="10" y="66" className="text-[9px] fill-amber-600 dark:fill-amber-400">Chưa có Ext / Uid</text>
          </g>

          {/* Fork to 4 show steps */}
          <path d="M 152 150 L 180 150 L 180 40 L 200 40" fill="none" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#inbound-arrow)" />
          <path d="M 180 100 L 200 100" fill="none" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#inbound-arrow)" />
          <path d="M 180 180 L 200 180" fill="none" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#inbound-arrow)" />
          <path d="M 180 150 L 180 240 L 200 240" fill="none" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#inbound-arrow)" />

          {/* 4 Parallel Show Boxes */}
          <g transform="translate(202, 18)">
            <rect width="168" height="46" rx="5" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <text x="8" y="18" className="text-[10px] font-semibold fill-fd-foreground">show (Ext 7875, .26568)</text>
            <text x="8" y="34" className="text-[9px] fill-fd-muted-foreground">Đang đổ chuông máy lẻ 7875</text>
          </g>

          <g transform="translate(202, 78)">
            <rect width="168" height="46" rx="5" className="fill-emerald-500/10 stroke-emerald-500/40" strokeWidth="1.4" />
            <text x="8" y="18" className="text-[10px] font-bold fill-emerald-700 dark:fill-emerald-300">show (Ext 7877, .26564) ★</text>
            <text x="8" y="34" className="text-[9px] fill-emerald-600 dark:fill-emerald-400">Đang đổ chuông máy lẻ 7877</text>
          </g>

          <g transform="translate(202, 158)">
            <rect width="168" height="46" rx="5" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <text x="8" y="18" className="text-[10px] font-semibold fill-fd-foreground">show (Ext 7874, .26562)</text>
            <text x="8" y="34" className="text-[9px] fill-fd-muted-foreground">Đang đổ chuông máy lẻ 7874</text>
          </g>

          <g transform="translate(202, 218)">
            <rect width="168" height="46" rx="5" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <text x="8" y="18" className="text-[10px] font-semibold fill-fd-foreground">show (Ext 7873, .26566)</text>
            <text x="8" y="34" className="text-[9px] fill-fd-muted-foreground">Đang đổ chuông máy lẻ 7873</text>
          </g>

          {/* Arrow from Ext 7877 to Answer */}
          <line x1="370" y1="101" x2="398" y2="101" className="stroke-emerald-500" strokeWidth="2" markerEnd="url(#inbound-arrow)" />

          {/* Answer Box */}
          <g transform="translate(400, 78)">
            <rect width="160" height="46" rx="6" className="fill-emerald-500/15 stroke-emerald-500" strokeWidth="1.6" />
            <text x="8" y="18" className="text-[10.5px] font-bold fill-emerald-700 dark:fill-emerald-300">3. answer (Ext 7877)</text>
            <text x="8" y="34" className="text-[9px] fill-emerald-600 dark:fill-emerald-400">Nhân viên 7877 nhấc máy</text>
          </g>

          {/* Trigger to 3x hide */}
          <path d="M 480 124 L 480 156 L 398 156" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* 3 Hide Boxes */}
          <g transform="translate(390, 150)">
            <rect width="180" height="70" rx="6" className="fill-amber-500/5 stroke-amber-500/40" strokeWidth="1.2" />
            <text x="8" y="16" className="text-[10px] font-bold fill-amber-700 dark:fill-amber-300">4. Ba sự kiện 'hide' (Dừng chuông):</text>
            <text x="8" y="32" className="text-[9px] fill-fd-muted-foreground">• Ext 7875: ANSWERED_ELSEWHERE</text>
            <text x="8" y="46" className="text-[9px] fill-fd-muted-foreground">• Ext 7874: ANSWERED_ELSEWHERE</text>
            <text x="8" y="60" className="text-[9px] fill-fd-muted-foreground">• Ext 7873: ANSWERED_ELSEWHERE</text>
          </g>

          {/* Arrow to finish */}
          <path d="M 560 101 L 590 101" className="stroke-emerald-500" strokeWidth="2" markerEnd="url(#inbound-arrow)" />

          {/* Finish Box */}
          <g transform="translate(592, 70)">
            <rect width="156" height="74" rx="6" className="fill-emerald-500/10 stroke-emerald-500/50" strokeWidth="1.6" />
            <text x="10" y="20" className="text-[11px] font-bold fill-emerald-700 dark:fill-emerald-300">5. finish</text>
            <text x="10" y="36" className="text-[9px] fill-fd-muted-foreground">Ext 7877 và khách gác máy</text>
            <text x="10" y="50" className="text-[9px] fill-fd-muted-foreground">Chốt cước, gửi link ghi âm</text>
            <text x="10" y="64" className="text-[8.5px] font-mono fill-emerald-600 dark:fill-emerald-400">recordingfileURL</text>
          </g>
        </svg>
      </div>

      <div className="border-t border-fd-border bg-fd-muted/20 px-4 py-2 text-xs text-fd-muted-foreground">
        <span className="font-semibold text-fd-foreground">Đặc tính mạng bất đồng bộ:</span> Do độ trễ gói tin Internet, các webhook 'hide' của máy nhánh phụ có thể đến server backend của bạn trước hoặc sau sự kiện 'answer' vài mili-giây.
      </div>
    </figure>
  );
}

