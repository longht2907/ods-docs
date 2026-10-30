import React from 'react';

/**
 * OdsphoneWidgetFlow
 * Sơ đồ luồng khởi tạo Widget ODSPhone và phân nhánh đăng nhập SIP.
 * Thể hiện rõ:
 * 1. Tiến trình nạp 3 bước: Khai báo ODS_CONFIG -> Nạp SDK -> Bắt odsphone:ready
 * 2. Hai nhánh đăng nhập: Nhập tay (Phương án A) vs Tự động qua code (Phương án B)
 * 3. Ranh giới an toàn thông tin: Iframe khác origin (an toàn tuyệt đối cho CRM) vs Programmatic login (CRM quản lý mật khẩu trong memory)
 * 4. Điểm hội tụ: SIP Registered thành công -> Bàn phím trực tuyến
 */
export function OdsphoneWidgetFlow() {
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card/50 shadow-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-purple-500" />
          <figcaption className="text-xs font-semibold uppercase tracking-wider text-fd-foreground">
            Luồng khởi tạo ODSPhone Widget & Ranh giới an toàn 2 phương án đăng nhập
          </figcaption>
        </div>
        <span className="hidden sm:inline-block font-mono text-[11px] text-fd-muted-foreground">
          Config ➔ SDK Load ➔ Ready Event ➔ (Manual | Auto Login) ➔ SIP Registered
        </span>
      </div>

      {/* SVG Canvas */}
      <div className="p-3 sm:p-5 overflow-x-auto">
        <svg
          viewBox="0 0 760 385"
          className="w-full h-auto min-w-[660px] text-fd-foreground select-none"
          style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}
          role="img"
          aria-label="Sơ đồ luồng khởi tạo và đăng nhập hai phương án của ODSPhone Widget"
        >
          <defs>
            <marker
              id="widget-arrow"
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
              id="widget-arrow-purple"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <polygon points="0 1, 7 4, 0 7" className="fill-purple-500" />
            </marker>
            <marker
              id="widget-arrow-sky"
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

          {/* ================= GIAI ĐOẠN 1: KHỞI TẠO (3 BƯỚC TUẦN TỰ) ================= */}
          {/* Step 1 */}
          <g transform="translate(15, 12)">
            <rect width="215" height="66" rx="6" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <circle cx="16" cy="18" r="8" className="fill-purple-500" />
            <text x="16" y="22" textAnchor="middle" className="text-[10px] font-bold fill-white">1</text>
            <text x="30" y="22" className="text-[11px] font-bold fill-fd-foreground">Khai báo ODS_CONFIG</text>
            <text x="12" y="42" className="text-[9.5px] font-mono fill-fd-muted-foreground">window.ODS_CONFIG = {"{"}</text>
            <text x="12" y="56" className="text-[9.5px] font-mono fill-fd-muted-foreground">  key, embedOrigin, ui ... {"}"}</text>
          </g>

          {/* Arrow 1 -> 2 */}
          <line x1="230" y1="45" x2="260" y2="45" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#widget-arrow)" />

          {/* Step 2 */}
          <g transform="translate(262, 12)">
            <rect width="220" height="66" rx="6" className="fill-fd-card stroke-fd-border" strokeWidth="1.2" />
            <circle cx="16" cy="18" r="8" className="fill-purple-500" />
            <text x="16" y="22" textAnchor="middle" className="text-[10px] font-bold fill-white">2</text>
            <text x="30" y="22" className="text-[11px] font-bold fill-fd-foreground">Nạp SDK odsphone.js</text>
            <text x="12" y="42" className="text-[9.5px] font-mono fill-fd-muted-foreground">&lt;script src="..." async&gt;</text>
            <text x="12" y="56" className="text-[9.5px] fill-fd-muted-foreground">Tải script từ webphone.ods.vn</text>
          </g>

          {/* Arrow 2 -> 3 */}
          <line x1="482" y1="45" x2="512" y2="45" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#widget-arrow)" />

          {/* Step 3 */}
          <g transform="translate(514, 12)">
            <rect width="230" height="66" rx="6" className="fill-fd-card stroke-purple-500/40" strokeWidth="1.4" />
            <circle cx="16" cy="18" r="8" className="fill-purple-500" />
            <text x="16" y="22" textAnchor="middle" className="text-[10px] font-bold fill-white">3</text>
            <text x="30" y="22" className="text-[11px] font-bold fill-purple-700 dark:fill-purple-300">Sự kiện odsphone:ready</text>
            <text x="12" y="42" className="text-[9.5px] fill-fd-muted-foreground">Widget nhúng iframe và tạo nút gọi</text>
            <text x="12" y="56" className="text-[9.5px] font-mono fill-purple-600 dark:fill-purple-400">event.detail.phone sẵn sàng</text>
          </g>

          {/* Line down and fork */}
          <path
            d="M 629 78 L 629 104 L 380 104"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <circle cx="380" cy="104" r="4" className="fill-purple-500" />

          {/* Fork lines to Branch A and Branch B */}
          <path
            d="M 380 104 L 180 104 L 180 134"
            fill="none"
            className="stroke-sky-500"
            strokeWidth="1.6"
            markerEnd="url(#widget-arrow-sky)"
          />
          <path
            d="M 380 104 L 580 104 L 580 134"
            fill="none"
            className="stroke-purple-500"
            strokeWidth="1.6"
            markerEnd="url(#widget-arrow-purple)"
          />

          {/* ================= GIAI ĐOẠN 2: HAI NHÁNH ĐĂNG NHẬP ================= */}
          {/* Branch A: Manual Login */}
          <g transform="translate(15, 138)">
            <rect width="345" height="150" rx="8" className="fill-sky-500/5 stroke-sky-500/40" strokeWidth="1.4" />
            <rect width="345" height="28" rx="8" className="fill-sky-500/15" />
            <text x="12" y="18" className="text-[11px] font-bold fill-sky-700 dark:fill-sky-300">
              Phương án A: Nhân viên tự nhập trên Widget
            </text>

            <text x="12" y="46" className="text-[10px] font-semibold fill-fd-foreground">• Thao tác nhân viên:</text>
            <text x="20" y="62" className="text-[9.5px] fill-fd-muted-foreground">Mở widget, nhập Máy lẻ, Mật khẩu SIP, Tổng đài</text>
            <text x="20" y="78" className="text-[9.5px] fill-fd-muted-foreground">Tùy chọn: "Ghi nhớ thông tin và mật khẩu"</text>

            <line x1="12" y1="88" x2="333" y2="88" stroke="currentColor" strokeOpacity="0.1" />

            <text x="12" y="104" className="text-[10px] font-bold fill-sky-600 dark:fill-sky-400">
              🛡️ Ranh giới bảo mật (Iframe Sandbox):
            </text>
            <text x="12" y="120" className="text-[9.5px] fill-fd-muted-foreground">
              Nhập trực tiếp trong iframe domain webphone.ods.vn.
            </text>
            <text x="12" y="136" className="text-[9.5px] font-medium fill-emerald-600 dark:fill-emerald-400">
              Mã CRM Frontend hoàn toàn không thể đọc được mật khẩu SIP.
            </text>
          </g>

          {/* Branch B: Programmatic Login */}
          <g transform="translate(400, 138)">
            <rect width="345" height="150" rx="8" className="fill-purple-500/5 stroke-purple-500/40" strokeWidth="1.4" />
            <rect width="345" height="28" rx="8" className="fill-purple-500/15" />
            <text x="12" y="18" className="text-[11px] font-bold fill-purple-700 dark:fill-purple-300">
              Phương án B: Tự động từ code CRM (Auto-Login)
            </text>

            <text x="12" y="46" className="text-[10px] font-semibold fill-fd-foreground">• Điều kiện & Lời gọi:</text>
            <text x="20" y="62" className="text-[9.5px] font-semibold fill-amber-600 dark:fill-amber-400">
              Bắt buộc API Key có programmaticLogin: true
            </text>
            <text x="20" y="78" className="text-[9.5px] font-mono fill-fd-muted-foreground">
              phone.login({"{"} extension, password, serverName {"}"})
            </text>

            <line x1="12" y1="88" x2="333" y2="88" stroke="currentColor" strokeOpacity="0.1" />

            <text x="12" y="104" className="text-[10px] font-bold fill-purple-600 dark:fill-purple-400">
              ⚠️ Ranh giới bảo mật (Client Memory):
            </text>
            <text x="12" y="120" className="text-[9.5px] fill-fd-muted-foreground">
              Frontend CRM có quyền truy cập mật khẩu máy lẻ trong bộ nhớ.
            </text>
            <text x="12" y="136" className="text-[9.5px] font-medium fill-rose-600 dark:fill-rose-400">
              Backend CRM kiểm soát quyền; cấm lưu localStorage/console.log.
            </text>
          </g>

          {/* Lines converging to Result */}
          <path
            d="M 180 288 L 180 310 L 380 310"
            fill="none"
            className="stroke-sky-500"
            strokeWidth="1.5"
          />
          <path
            d="M 580 288 L 580 310 L 380 310"
            fill="none"
            className="stroke-purple-500"
            strokeWidth="1.5"
          />
          <line x1="380" y1="310" x2="380" y2="328" stroke="currentColor" strokeWidth="1.8" markerEnd="url(#widget-arrow)" />

          {/* ================= GIAI ĐOẠN 3: HỘI TỤ (SIP REGISTERED) ================= */}
          <g transform="translate(195, 330)">
            <rect width="370" height="46" rx="8" className="fill-emerald-500/10 stroke-emerald-500/50" strokeWidth="1.6" />
            <circle cx="24" cy="23" r="10" className="fill-emerald-500" />
            <path d="M 19 23 L 23 27 L 29 19" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="44" y="21" className="text-[11.5px] font-bold fill-emerald-700 dark:fill-emerald-300">
              Đăng ký SIP Thành công (SIP Registered)
            </text>
            <text x="44" y="36" className="text-[10px] fill-fd-muted-foreground">
              Bàn phím chuyển trạng thái Trực tuyến ➔ Sẵn sàng nghe/gọi và điều khiển cuộc gọi
            </text>
          </g>
        </svg>
      </div>

      {/* Footer notes */}
      <div className="flex flex-wrap items-center justify-between border-t border-fd-border bg-fd-muted/20 px-4 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-fd-foreground">Lưu ý ranh giới:</span>
          <span className="text-fd-muted-foreground">
            Phương án A cô lập mật khẩu qua Cross-origin Iframe; Phương án B đòi hỏi Backend CRM bảo vệ việc cấp mật khẩu xuống client.
          </span>
        </div>
      </div>
    </figure>
  );
}

