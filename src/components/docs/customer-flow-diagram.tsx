import {
  ArrowRight,
  PhoneForwarded,
  Sparkles,
  UserCheck,
  UserPlus,
} from 'lucide-react';

export function CustomerFlowDiagram() {
  return (
    <div className="not-prose my-6 rounded-2xl border border-fd-border/70 bg-fd-card/40 p-5 md:p-6 shadow-sm backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">
          <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
          Sơ đồ luồng dữ liệu & tích hợp tổng đài
        </div>
        <span className="text-[11px] text-fd-muted-foreground/80">Mini CRM Architecture</span>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
        {/* Khối 1: Khách hàng tiềm năng (Leads) */}
        <div className="flex flex-col justify-between rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 lg:col-span-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                Giai đoạn 1: Tiếp cận
              </span>
              <code className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[11px] font-mono text-amber-700 dark:text-amber-300">
                lead-list
              </code>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
                <UserPlus className="size-4" />
              </div>
              <h4 className="text-sm font-semibold text-fd-foreground">
                Khách hàng tiềm năng (Leads)
              </h4>
            </div>

            <div className="mt-2 text-xs leading-relaxed text-fd-muted-foreground">
              Dữ liệu thô từ Hotline gọi vào, Form website, Zalo OA hoặc chiến dịch tiếp thị.
            </div>
          </div>

          <div className="mt-4 border-t border-amber-500/15 pt-2.5 text-[11px] text-amber-700/80 dark:text-amber-300/80">
            • Phân loại sơ bộ • Ghi nhận nhu cầu
          </div>
        </div>

        {/* Mũi tên chuyển đổi */}
        <div className="flex flex-col items-center justify-center text-center lg:col-span-1">
          <div className="hidden flex-col items-center gap-1.5 lg:flex">
            <span className="whitespace-nowrap text-[11px] font-medium text-fd-muted-foreground">
              Chốt hợp đồng
            </span>
            <div className="flex size-7 items-center justify-center rounded-full border border-fd-border bg-fd-background text-fd-primary shadow-xs">
              <ArrowRight className="size-4" />
            </div>
          </div>
          <div className="my-1 flex items-center justify-center gap-2 text-xs font-medium text-fd-muted-foreground lg:hidden">
            <span>Tư vấn & Chuyển đổi trạng thái</span>
            <span>↓</span>
          </div>
        </div>

        {/* Khối 2: Khách hàng hiện tại (Customer) */}
        <div className="flex flex-col justify-between rounded-xl border border-fd-primary/40 bg-fd-primary/5 p-4 lg:col-span-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-fd-primary/20 px-2.5 py-0.5 text-xs font-semibold text-fd-primary">
                Giai đoạn 2: Khách hàng
              </span>
              <code className="rounded bg-fd-primary/10 px-1.5 py-0.5 text-[11px] font-mono text-fd-primary">
                customer-list
              </code>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-fd-primary/20 text-fd-primary">
                <UserCheck className="size-4" />
              </div>
              <h4 className="text-sm font-semibold text-fd-foreground">
                Khách hàng hiện tại (Customer)
              </h4>
            </div>

            <div className="mt-2 text-xs leading-relaxed text-fd-muted-foreground">
              Hồ sơ chính thức, gán nhãn phân loại (VIP), liên kết doanh nghiệp và nhân sự phụ trách.
            </div>
          </div>

          <div className="mt-4 border-t border-fd-primary/15 pt-2.5 text-[11px] text-fd-primary/90">
            • Lưu nhiều số ĐT • Đồng bộ PBX Core
          </div>
        </div>

        {/* Khối 3: Tích hợp Tổng đài (Cloud PBX) */}
        <div className="flex flex-col justify-center gap-2.5 lg:col-span-3">
          <div className="rounded-xl border border-fd-border/80 bg-fd-background/80 p-3 text-xs transition-colors hover:border-fd-primary/60">
            <div className="flex items-center gap-2 font-semibold text-fd-foreground">
              <div className="flex size-6 items-center justify-center rounded-md bg-blue-500/15 text-blue-500">
                <PhoneForwarded className="size-3.5" />
              </div>
              <span>Định tuyến luật khách quen</span>
            </div>
            <div className="mt-1.5 text-[11px] leading-snug text-fd-muted-foreground">
              Tự động kết nối đúng máy nhánh nhân viên phụ trách khi khách gọi đến.
            </div>
          </div>

          <div className="rounded-xl border border-fd-border/80 bg-fd-background/80 p-3 text-xs transition-colors hover:border-fd-primary/60">
            <div className="flex items-center gap-2 font-semibold text-fd-foreground">
              <div className="flex size-6 items-center justify-center rounded-md bg-purple-500/15 text-purple-500">
                <Sparkles className="size-3.5" />
              </div>
              <span>Popup thông tin cuộc gọi</span>
            </div>
            <div className="mt-1.5 text-[11px] leading-snug text-fd-muted-foreground">
              Nhận diện danh tính, số điện thoại và mở nhanh hồ sơ ngay khi đổ chuông.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
