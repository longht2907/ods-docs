const steps = [
  {
    title: 'Chuẩn bị danh bạ',
    detail: 'Tạo nhóm và lấy ContactID',
  },
  {
    title: 'Chuẩn bị tài nguyên',
    detail: 'Lấy Trunk và AudioId',
  },
  {
    title: 'Gửi StartCampaign',
    detail: 'Truyền lịch gọi và cấu hình IVR',
  },
  {
    title: 'Theo dõi kết quả',
    detail: 'Lưu CampaignId; nhận callback nếu có APIURL',
  },
] as const;

export function StartCampaignFlow() {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card/50 shadow-xs">
      <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted/40 px-4 py-2.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-fd-foreground">
          Luồng chuẩn bị và khởi chạy chiến dịch
        </span>
        <span className="hidden font-mono text-[11px] text-fd-muted-foreground sm:inline">
          Resources → StartCampaign → Callback
        </span>
      </div>

      <ol className="grid gap-0 p-4 sm:grid-cols-4 sm:p-5" aria-label="Bốn bước khởi chạy chiến dịch Autocall">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative border-l border-fd-border pb-6 pl-10 last:pb-0 sm:border-l-0 sm:border-t sm:pb-0 sm:pl-0 sm:pt-8"
          >
            <span className="absolute left-0 top-0 grid size-7 -translate-x-1/2 place-items-center rounded-full border border-fd-border bg-fd-background font-mono text-xs font-semibold text-fd-foreground sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
              {index + 1}
            </span>
            <div className="pr-3 sm:px-3 sm:text-center">
              <div className="text-sm font-semibold text-fd-foreground">{step.title}</div>
              <p className="mt-1 text-xs leading-5 text-fd-muted-foreground">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="border-t border-fd-border bg-fd-muted/20 px-4 py-3 text-xs leading-5 text-fd-muted-foreground">
        <code className="text-fd-foreground">ContactID</code>,{' '}
        <code className="text-fd-foreground">Trunk</code> và{' '}
        <code className="text-fd-foreground">AudioId</code> phải được lấy từ các API tài
        nguyên tương ứng trước khi gửi request.{' '}
        <code className="text-fd-foreground">CampaignId</code> là khóa dùng để tra cứu hoặc
        cập nhật chiến dịch.
      </div>
    </div>
  );
}
