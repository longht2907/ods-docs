import React from 'react';

/**
 * WebrtcArchitectureDiagram
 * Sơ đồ kiến trúc WebRTC và SIP over WSS trong hệ thống tổng đài ODS Cloud.
 * Làm rõ:
 * 1. Khối Trình duyệt của nhân viên (CRM/ERP Frontend) - Chạy SIP client và WebRTC Audio.
 * 2. Khối Hạ tầng ODS Cloud PBX - Chứa SIP Proxy / SBC (Cổng WSS: 4433), PBX Core và Media Gateway.
 * 3. Kênh Báo hiệu SIP (Signaling qua WSS) tách biệt hoàn toàn với Kênh Âm thanh (Media qua SRTP/UDP).
 */
export function WebrtcArchitectureDiagram() {
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card/50 shadow-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-sky-500" />
          <figcaption className="text-xs font-semibold uppercase tracking-wider text-fd-foreground">
            Kiến trúc kết nối WebRTC & SIP over WSS
          </figcaption>
        </div>
        <span className="hidden sm:inline-block font-mono text-[11px] text-fd-muted-foreground">
          Browser ⟷ ODS Cloud (WSS 4433 + SRTP) ⟷ PSTN
        </span>
      </div>

      {/* SVG Canvas */}
      <div className="p-3 sm:p-5 overflow-x-auto">
        <svg
          viewBox="0 0 760 390"
          className="w-full h-auto min-w-[660px] text-fd-foreground select-none"
          style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}
          role="img"
          aria-label="Sơ đồ kiến trúc WebRTC phân tách rõ ranh giới Trình duyệt nhân viên và Hạ tầng ODS Cloud"
        >
          <defs>
            <marker
              id="webrtc-arrow-sky"
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
              id="webrtc-arrow-emerald"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <polygon points="0 1, 7 4, 0 7" className="fill-emerald-500" />
            </marker>
            <marker
              id="webrtc-arrow-purple"
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

          {/* ================= ZONE 1: TRÌNH DUYỆT NHÂN VIÊN ================= */}
          <rect
            x="12"
            y="12"
            width="245"
            height="366"
            rx="8"
            className="fill-sky-500/5 stroke-sky-500/30"
            strokeWidth="1.2"
          />
          <text x="24" y="32" className="text-[11px] font-bold uppercase tracking-wider fill-sky-700 dark:fill-sky-300">
            1. Trình duyệt Nhân viên (CRM Frontend)
          </text>

          {/* Subbox: SIP Client (Webphone) */}
          <g transform="translate(24, 46)">
            <rect width="220" height="90" rx="6" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <text x="12" y="20" className="text-[11px] font-semibold fill-sky-600 dark:fill-sky-400">
              SIP Client (Webphone)
            </text>
            <text x="12" y="38" className="text-[10px] fill-fd-muted-foreground">• JsSIP / SIP.js / Widget SDK</text>
            <text x="12" y="54" className="text-[10px] fill-fd-muted-foreground">• Quản lý SIP REGISTER (Máy lẻ)</text>
            <text x="12" y="70" className="text-[10px] fill-fd-muted-foreground">• INVITE, Ringing, Call Control</text>
          </g>

          {/* Subbox: WebRTC Audio Engine */}
          <g transform="translate(24, 150)">
            <rect width="220" height="96" rx="6" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <text x="12" y="20" className="text-[11px] font-semibold fill-emerald-600 dark:fill-emerald-400">
              WebRTC Audio Device
            </text>
            <text x="12" y="38" className="text-[10px] fill-fd-muted-foreground">• Thu âm từ Microphone (G.711 / Opus)</text>
            <text x="12" y="54" className="text-[10px] fill-fd-muted-foreground">• Phát âm thanh đối phương ra Loa/Tai nghe</text>
            <text x="12" y="70" className="text-[10px] fill-fd-muted-foreground">• Thỏa thuận SDP Codec hai chiều</text>
            <text x="12" y="86" className="text-[9.5px] font-medium fill-amber-600 dark:fill-amber-400">⚠️ Bắt buộc HTTPS để cấp quyền Mic</text>
          </g>

          {/* Subbox: Giao diện CRM */}
          <g transform="translate(24, 260)">
            <rect width="220" height="106" rx="6" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <text x="12" y="20" className="text-[11px] font-semibold fill-fd-foreground">
              Ứng dụng Nghiệp vụ CRM / ERP
            </text>
            <text x="12" y="38" className="text-[10px] fill-fd-muted-foreground">• Giao diện bàn phím gọi / danh bạ</text>
            <text x="12" y="54" className="text-[10px] fill-fd-muted-foreground">• Nút bấm gọi Click-to-Call</text>
            <text x="12" y="70" className="text-[10px] fill-fd-muted-foreground">• Popup thông tin khách hàng</text>
            <text x="12" y="88" className="text-[9.5px] fill-fd-muted-foreground">Phụ thuộc tab trình duyệt hoạt động</text>
          </g>

          {/* ================= ZONE 2: HẠ TẦNG ODS CLOUD ================= */}
          <rect
            x="290"
            y="12"
            width="250"
            height="366"
            rx="8"
            className="fill-purple-500/5 stroke-purple-500/30"
            strokeWidth="1.2"
          />
          <text x="302" y="32" className="text-[11px] font-bold uppercase tracking-wider fill-purple-700 dark:fill-purple-300">
            2. Hạ tầng Tổng đài ODS Cloud
          </text>

          {/* Subbox: SIP Proxy / SBC */}
          <g transform="translate(302, 46)">
            <rect width="226" height="96" rx="6" className="fill-fd-card stroke-purple-500/30" strokeWidth="1.2" />
            <text x="12" y="20" className="text-[11px] font-semibold fill-purple-600 dark:fill-purple-400">
              SIP Proxy / SBC Gateway
            </text>
            <text x="12" y="36" className="text-[9.5px] font-mono fill-fd-muted-foreground">wss://rtc.cloudfone.vn:4433</text>
            <line x1="12" y1="44" x2="214" y2="44" stroke="currentColor" strokeOpacity="0.1" />
            <text x="12" y="60" className="text-[10px] fill-fd-muted-foreground">• Tiếp nhận kết nối WebSocket WSS</text>
            <text x="12" y="74" className="text-[10px] fill-fd-muted-foreground">• Xác thực Digest Authentication SIP</text>
            <text x="12" y="88" className="text-[10px] fill-fd-muted-foreground">• Quản lý trạng thái máy nhánh online</text>
          </g>

          {/* Subbox: PBX Engine & Media Server */}
          <g transform="translate(302, 154)">
            <rect width="226" height="136" rx="6" className="fill-fd-card stroke-purple-500/30" strokeWidth="1.2" />
            <text x="12" y="20" className="text-[11px] font-semibold fill-purple-600 dark:fill-purple-400">
              PBX Core & Media Gateway
            </text>
            <text x="12" y="38" className="text-[10px] fill-fd-muted-foreground">• Chuyển đổi mã hóa WebRTC ⟷ SIP</text>
            <text x="12" y="54" className="text-[10px] fill-fd-muted-foreground">• SRTP (Web) ⟷ RTP / G.711 (Telco)</text>
            <text x="12" y="70" className="text-[10px] fill-fd-muted-foreground">• Định tuyến Ring Group / IVR / Queue</text>
            <text x="12" y="86" className="text-[10px] fill-fd-muted-foreground">• Ghi âm cuộc gọi tự động</text>
            <text x="12" y="104" className="text-[9.5px] font-mono fill-fd-muted-foreground">UDP Port Range: 10000 - 20000</text>
            <text x="12" y="122" className="text-[9.5px] font-semibold fill-emerald-600 dark:fill-emerald-400">Kênh âm thanh trực tiếp (Direct Media)</text>
          </g>

          {/* REST API & Webhook Notification Service */}
          <g transform="translate(302, 302)">
            <rect width="226" height="64" rx="6" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <text x="12" y="20" className="text-[10.5px] font-semibold fill-fd-foreground">
              Quản trị & Sự kiện bổ trợ
            </text>
            <text x="12" y="38" className="text-[9.5px] fill-fd-muted-foreground">• REST API: Click-to-Call, GetCallLogs</text>
            <text x="12" y="52" className="text-[9.5px] fill-fd-muted-foreground">• Webhook HTTP POST: Sự kiện cuộc gọi</text>
          </g>

          {/* ================= ZONE 3: ĐẦU CUỐI & VIỄN THÔNG ================= */}
          <rect
            x="572"
            y="12"
            width="176"
            height="366"
            rx="8"
            className="fill-fd-muted/20 stroke-fd-border"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
          <text x="584" y="32" className="text-[11px] font-bold uppercase tracking-wider fill-fd-foreground">
            3. Đầu cuối & Mạng Telco
          </text>

          {/* PSTN Gateway */}
          <g transform="translate(584, 56)">
            <rect width="152" height="130" rx="6" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <text x="10" y="20" className="text-[11px] font-semibold fill-fd-foreground">
              Hạ tầng Nhà mạng (PSTN)
            </text>
            <text x="10" y="38" className="text-[10px] fill-fd-muted-foreground">• Viettel, VNPT, MobiFone...</text>
            <text x="10" y="54" className="text-[10px] fill-fd-muted-foreground">• SIP Trunking đầu số</text>
            <line x1="10" y1="64" x2="142" y2="64" stroke="currentColor" strokeOpacity="0.1" />
            <text x="10" y="80" className="text-[10px] font-semibold fill-sky-600 dark:fill-sky-400">Khách hàng nhận/gọi:</text>
            <text x="10" y="96" className="text-[9.5px] fill-fd-muted-foreground">• Điện thoại di động</text>
            <text x="10" y="112" className="text-[9.5px] fill-fd-muted-foreground">• Điện thoại cố định</text>
          </g>

          {/* Internal Extension Terminals */}
          <g transform="translate(584, 206)">
            <rect width="152" height="150" rx="6" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <text x="10" y="20" className="text-[11px] font-semibold fill-fd-foreground">
              Đầu cuối nội bộ khác
            </text>
            <text x="10" y="38" className="text-[10px] fill-fd-muted-foreground">• IP Phone để bàn (Yealink, Grandstream)</text>
            <text x="10" y="66" className="text-[10px] fill-fd-muted-foreground">• Softphone cài máy tính (MicroSIP, Zoiper)</text>
            <text x="10" y="96" className="text-[10px] fill-fd-muted-foreground">• CloudFone App trên smartphone</text>
            <text x="10" y="130" className="text-[9.5px] fill-fd-muted-foreground">Đàm thoại nội bộ miễn phí</text>
          </g>

          {/* ================= CONNECTING ARROWS ================= */}
          {/* 1. Signaling: SIP over WSS */}
          <path
            d="M 244 88 L 302 88"
            className="stroke-sky-500"
            strokeWidth="2"
            markerEnd="url(#webrtc-arrow-sky)"
          />
          <rect x="250" y="70" width="46" height="16" rx="3" className="fill-fd-background/90 stroke-sky-500/30" strokeWidth="0.8" />
          <text x="273" y="82" textAnchor="middle" className="text-[8.5px] font-mono font-semibold fill-sky-600 dark:fill-sky-400">
            WSS (1)
          </text>

          {/* 2. Media: SRTP / WebRTC */}
          <path
            d="M 244 195 L 302 195"
            className="stroke-emerald-500"
            strokeWidth="2.2"
            markerEnd="url(#webrtc-arrow-emerald)"
          />
          <rect x="248" y="177" width="50" height="16" rx="3" className="fill-fd-background/90 stroke-emerald-500/30" strokeWidth="0.8" />
          <text x="273" y="189" textAnchor="middle" className="text-[8.5px] font-mono font-semibold fill-emerald-600 dark:fill-emerald-400">
            SRTP (2)
          </text>

          {/* 3. ODS PBX to PSTN */}
          <path
            d="M 528 120 L 584 120"
            className="stroke-purple-500"
            strokeWidth="1.8"
            markerEnd="url(#webrtc-arrow-purple)"
          />
          <text x="556" y="112" textAnchor="middle" className="text-[9px] font-mono fill-fd-muted-foreground">
            SIP Trunk
          </text>

          {/* 4. ODS PBX to Internal Terminals */}
          <path
            d="M 528 270 L 584 270"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        </svg>
      </div>

      {/* Legend footer */}
      <div className="flex flex-wrap items-center gap-4 border-t border-fd-border bg-fd-muted/20 px-4 py-2 text-xs">
        <span className="font-semibold text-fd-foreground">Chú giải kết nối:</span>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-sky-500" />
          <span className="text-fd-muted-foreground font-mono text-[11px]">(1) Báo hiệu: SIP over WSS (Cổng 4433)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span className="text-fd-muted-foreground font-mono text-[11px]">(2) Luồng âm thanh: WebRTC SRTP qua UDP</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-purple-500" />
          <span className="text-fd-muted-foreground font-mono text-[11px]">(3) Mạng viễn thông: SIP Trunking</span>
        </div>
      </div>
    </figure>
  );
}

/**
 * WebrtcConnectionFlowDiagram
 * Sơ đồ tiến trình 4 mốc kết nối WebRTC (WSS Handshake -> SIP REGISTER -> INVITE -> SRTP Media).
 * Nhấn mạnh 2 nguyên tắc kỹ thuật cốt lõi:
 * - WSS connected != SIP registered
 * - SIP registered != Đã thông âm thanh Media
 */
export function WebrtcConnectionFlowDiagram() {
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card/50 shadow-xs">
      <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500" />
          <figcaption className="text-xs font-semibold uppercase tracking-wider text-fd-foreground">
            Bốn mốc trạng thái kết nối WebRTC & Ranh giới kênh truyền
          </figcaption>
        </div>
        <span className="hidden sm:inline-block font-mono text-[11px] text-fd-muted-foreground">
          WSS Handshake ➔ SIP REGISTER ➔ INVITE/SDP ➔ SRTP Audio
        </span>
      </div>

      <div className="p-3 sm:p-5 overflow-x-auto">
        <svg
          viewBox="0 0 760 270"
          className="w-full h-auto min-w-[660px] text-fd-foreground select-none"
          style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}
          role="img"
          aria-label="Sơ đồ 4 mốc trạng thái thiết lập cuộc gọi WebRTC"
        >
          <defs>
            <marker
              id="step-flow-arrow"
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

          {/* Step 1 */}
          <g transform="translate(10, 16)">
            <rect width="168" height="152" rx="8" className="fill-fd-card stroke-sky-500/40" strokeWidth="1.4" />
            <rect width="168" height="30" rx="8" className="fill-sky-500/10" />
            <circle cx="20" cy="15" r="9" className="fill-sky-500" />
            <text x="20" y="19" textAnchor="middle" className="text-[10px] font-bold fill-white">1</text>
            <text x="36" y="19" className="text-[11px] font-bold fill-sky-700 dark:fill-sky-300">WSS Handshake</text>

            <text x="12" y="48" className="text-[10px] font-semibold fill-fd-foreground">Mở kết nối WebSocket:</text>
            <text x="12" y="64" className="text-[9.5px] font-mono fill-fd-muted-foreground">wss://rtc.cloudfone.vn</text>
            <text x="12" y="78" className="text-[9.5px] font-mono fill-fd-muted-foreground">Cổng: 4433</text>
            <line x1="12" y1="88" x2="156" y2="88" stroke="currentColor" strokeOpacity="0.1" />
            <text x="12" y="104" className="text-[9.5px] fill-fd-muted-foreground">Xác nhận đường truyền</text>
            <text x="12" y="118" className="text-[9.5px] fill-fd-muted-foreground">TCP/TLS thông suốt</text>
            <rect x="12" y="126" width="144" height="18" rx="3" className="fill-sky-500/10" />
            <text x="84" y="139" textAnchor="middle" className="text-[9px] font-semibold fill-sky-600 dark:fill-sky-400">Trạng thái: WSS Connected</text>
          </g>

          {/* Arrow 1 -> 2 */}
          <line x1="180" y1="92" x2="198" y2="92" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#step-flow-arrow)" />

          {/* Step 2 */}
          <g transform="translate(200, 16)">
            <rect width="168" height="152" rx="8" className="fill-fd-card stroke-indigo-500/40" strokeWidth="1.4" />
            <rect width="168" height="30" rx="8" className="fill-indigo-500/10" />
            <circle cx="20" cy="15" r="9" className="fill-indigo-500" />
            <text x="20" y="19" textAnchor="middle" className="text-[10px] font-bold fill-white">2</text>
            <text x="36" y="19" className="text-[11px] font-bold fill-indigo-700 dark:fill-indigo-300">SIP REGISTER</text>

            <text x="12" y="48" className="text-[10px] font-semibold fill-fd-foreground">Xác thực máy nhánh:</text>
            <text x="12" y="64" className="text-[9.5px] fill-fd-muted-foreground">• Máy lẻ: extension (101)</text>
            <text x="12" y="78" className="text-[9.5px] fill-fd-muted-foreground">• Mật khẩu SIP máy lẻ</text>
            <text x="12" y="92" className="text-[9.5px] fill-fd-muted-foreground">• Realm (Tenant domain)</text>
            <line x1="12" y1="98" x2="156" y2="98" stroke="currentColor" strokeOpacity="0.1" />
            <text x="12" y="114" className="text-[9.5px] fill-fd-muted-foreground">Tổng đài trả 200 OK</text>
            <rect x="12" y="126" width="144" height="18" rx="3" className="fill-indigo-500/10" />
            <text x="84" y="139" textAnchor="middle" className="text-[9px] font-semibold fill-indigo-600 dark:fill-indigo-400">Trạng thái: SIP Registered</text>
          </g>

          {/* Arrow 2 -> 3 */}
          <line x1="370" y1="92" x2="388" y2="92" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#step-flow-arrow)" />

          {/* Step 3 */}
          <g transform="translate(390, 16)">
            <rect width="168" height="152" rx="8" className="fill-fd-card stroke-amber-500/40" strokeWidth="1.4" />
            <rect width="168" height="30" rx="8" className="fill-amber-500/10" />
            <circle cx="20" cy="15" r="9" className="fill-amber-500" />
            <text x="20" y="19" textAnchor="middle" className="text-[10px] font-bold fill-white">3</text>
            <text x="36" y="19" className="text-[11px] font-bold fill-amber-700 dark:fill-amber-300">INVITE & Ringing</text>

            <text x="12" y="48" className="text-[10px] font-semibold fill-fd-foreground">Khởi tạo & Thỏa thuận:</text>
            <text x="12" y="64" className="text-[9.5px] fill-fd-muted-foreground">• Gửi bản tin SIP INVITE</text>
            <text x="12" y="78" className="text-[9.5px] fill-fd-muted-foreground">• 180 Ringing (Đang đổ chuông)</text>
            <text x="12" y="92" className="text-[9.5px] fill-fd-muted-foreground">• Đàm phán SDP (Opus/PCMA)</text>
            <line x1="12" y1="98" x2="156" y2="98" stroke="currentColor" strokeOpacity="0.1" />
            <text x="12" y="114" className="text-[9.5px] fill-fd-muted-foreground">Tạo kênh thoại tiềm năng</text>
            <rect x="12" y="126" width="144" height="18" rx="3" className="fill-amber-500/10" />
            <text x="84" y="139" textAnchor="middle" className="text-[9px] font-semibold fill-amber-600 dark:fill-amber-400">Đang đổ chuông (Early)</text>
          </g>

          {/* Arrow 3 -> 4 */}
          <line x1="560" y1="92" x2="578" y2="92" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#step-flow-arrow)" />

          {/* Step 4 */}
          <g transform="translate(580, 16)">
            <rect width="170" height="152" rx="8" className="fill-fd-card stroke-emerald-500/50" strokeWidth="1.6" />
            <rect width="170" height="30" rx="8" className="fill-emerald-500/15" />
            <circle cx="20" cy="15" r="9" className="fill-emerald-500" />
            <text x="20" y="19" textAnchor="middle" className="text-[10px] font-bold fill-white">4</text>
            <text x="36" y="19" className="text-[11px] font-bold fill-emerald-700 dark:fill-emerald-300">Đàm thoại Audio</text>

            <text x="12" y="48" className="text-[10px] font-semibold fill-emerald-600 dark:fill-emerald-400">Nhấc máy (200 OK):</text>
            <text x="12" y="64" className="text-[9.5px] fill-fd-muted-foreground">• Luồng SRTP 2 chiều qua UDP</text>
            <text x="12" y="78" className="text-[9.5px] fill-fd-muted-foreground">• Trực tiếp giữa Mic/Loa & PBX</text>
            <text x="12" y="92" className="text-[9.5px] fill-fd-muted-foreground">• Âm thanh KHÔNG qua WSS</text>
            <line x1="12" y1="98" x2="158" y2="98" stroke="currentColor" strokeOpacity="0.1" />
            <text x="12" y="114" className="text-[9.5px] fill-fd-muted-foreground">BYE để ngắt kết nối</text>
            <rect x="12" y="126" width="146" height="18" rx="3" className="fill-emerald-500/20" />
            <text x="85" y="139" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700 dark:fill-emerald-300">Trạng thái: In Call (Active)</text>
          </g>

          {/* Bottom Callout Blocks: 2 Critical Rules */}
          <g transform="translate(10, 184)">
            <rect width="358" height="72" rx="6" className="fill-fd-muted/30 stroke-fd-border" strokeWidth="1" />
            <text x="14" y="22" className="text-[10.5px] font-bold fill-amber-600 dark:fill-amber-400">
              ⚡ Nguyên tắc 1: WSS connected ≠ SIP registered
            </text>
            <text x="14" y="42" className="text-[9.5px] fill-fd-muted-foreground">
              Mở thành công WebSocket (Bước 1) chỉ chứng minh mạng thông tới cổng 4433.
            </text>
            <text x="14" y="58" className="text-[9.5px] fill-fd-muted-foreground">
              Chỉ khi hoàn tất Bước 2 máy nhánh mới chính thức trực tuyến trên tổng đài.
            </text>
          </g>

          <g transform="translate(390, 184)">
            <rect width="360" height="72" rx="6" className="fill-fd-muted/30 stroke-fd-border" strokeWidth="1" />
            <text x="14" y="22" className="text-[10.5px] font-bold fill-emerald-600 dark:fill-emerald-400">
              ⚡ Nguyên tắc 2: SIP registered ≠ Đã thông âm thanh
            </text>
            <text x="14" y="42" className="text-[9.5px] fill-fd-muted-foreground">
              Báo hiệu SIP thành công nhưng nếu mạng chặn cổng UDP hoặc trình duyệt
            </text>
            <text x="14" y="58" className="text-[9.5px] fill-fd-muted-foreground">
              chưa được cấp quyền Microphone, cuộc gọi sẽ câm tiếng (One-way/No audio).
            </text>
          </g>
        </svg>
      </div>
    </figure>
  );
}

