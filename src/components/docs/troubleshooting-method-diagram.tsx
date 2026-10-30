import React from 'react';

/**
 * TroubleshootingMethodDiagram
 * Sơ đồ trực quan hóa phương pháp 4 bước khoanh vùng và xử lý sự cố Tổng đài ODS.
 * Chuẩn Server Component, responsive (desktop stepper / mobile stack), hỗ trợ dark/light mode.
 */
export function TroubleshootingMethodDiagram() {
  const steps = [
    {
      step: '01',
      title: 'Xác định phạm vi',
      badge: 'Scope',
      desc: '1 máy nhánh, 1 nhóm người dùng, 1 đầu số hay toàn bộ tổng đài',
      color: 'blue',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      step: '02',
      title: 'Xác định tầng lỗi',
      badge: 'Layer',
      desc: 'Client thiết bị, Media/RTP, Trunk nhà mạng hay API/Ứng dụng',
      color: 'indigo',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      step: '03',
      title: 'Thu thập chứng cứ',
      badge: 'Evidence',
      desc: 'Caller/Callee, mốc thời gian, mã SIP 4xx/5xx và SIP Call-ID',
      color: 'amber',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      step: '04',
      title: 'Mở Runbook xử lý',
      badge: 'Runbook',
      desc: 'Đối chiếu danh mục theo triệu chứng để thực thi quy trình chuẩn',
      color: 'emerald',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <figure className="my-6 rounded-xl border border-fd-border bg-fd-card/50 p-4 sm:p-6 shadow-sm overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-fd-border/60 pb-3 mb-5">
        <div>
          <h4 className="text-sm font-semibold text-fd-foreground flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Phương pháp 4 bước khoanh vùng và xử lý sự cố (Troubleshooting Flow)
          </h4>
          <p className="text-xs text-fd-muted-foreground mt-0.5">
            Quy trình chuẩn hóa giúp kỹ sư Support xác định nguyên nhân gốc rễ và xử lý sự cố nhanh nhất
          </p>
        </div>
      </div>

      {/* Grid các bước */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
        {steps.map((item, index) => (
          <div
            key={item.step}
            className="group relative flex flex-col justify-between rounded-lg border border-fd-border bg-fd-background p-4 transition-all hover:border-fd-primary/40 hover:shadow-sm"
          >
            {/* Header của từng bước */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-md font-mono text-xs font-bold bg-fd-muted text-fd-foreground border border-fd-border">
                  {item.step}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fd-muted text-fd-muted-foreground">
                  {item.badge}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2 text-fd-foreground">
                <div className="text-fd-primary">{item.icon}</div>
                <h5 className="text-sm font-semibold">{item.title}</h5>
              </div>

              <p className="text-xs text-fd-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Mũi tên kết nối trên desktop (trừ bước cuối) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-fd-muted-foreground">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <figcaption className="mt-4 text-center text-xs text-fd-muted-foreground border-t border-fd-border/50 pt-2.5">
        <strong>Hình:</strong> Tiến trình 4 bước khoanh vùng sự cố — từ định vị phạm vi đến thu thập chứng cứ và mở runbook xử lý.
      </figcaption>
    </figure>
  );
}

