import React from 'react';

/**
 * NetworkTopologyDiagram
 * Sơ đồ trực quan hóa mô hình phân tầng mạng ODS (ISP & Transit -> Core Router -> DSW -> ASW -> Khách hàng).
 * Chuẩn SVG Server Component, hỗ trợ light/dark mode, responsive, token chuẩn Fumadocs/ODS.
 */
export function NetworkTopologyDiagram() {
  return (
    <figure className="my-6 rounded-xl border border-fd-border bg-fd-card/50 p-4 sm:p-6 shadow-sm overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-fd-border/60 pb-3 mb-4">
        <div>
          <h4 className="text-sm font-semibold text-fd-foreground flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            Sơ đồ kiến trúc phân tầng mạng ODS (Network Hierarchy)
          </h4>
          <p className="text-xs text-fd-muted-foreground mt-0.5">
            Mô hình luồng dữ liệu 4 tầng vật lý kết nối từ Internet ra vào máy chủ khách hàng
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-fd-muted-foreground font-mono">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            BGP Peering
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            10G/40G Trunk
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            1G/10G Trunk
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 860 560"
          className="w-full min-w-[760px] h-auto font-sans select-none"
          role="img"
          aria-label="Sơ đồ phân tầng mạng ODS từ ISP Transit đến Router Core, Distribution Switch, Access Switch và Máy chủ Khách hàng"
        >
          <defs>
            <marker
              id="net-arrow-blue"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M 1 1 L 7 4 L 1 7 Z" className="fill-blue-500" />
            </marker>
            <marker
              id="net-arrow-emerald"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M 1 1 L 7 4 L 1 7 Z" className="fill-emerald-500" />
            </marker>
            <marker
              id="net-arrow-amber"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M 1 1 L 7 4 L 1 7 Z" className="fill-amber-500" />
            </marker>
            <marker
              id="net-arrow-slate"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M 1 1 L 7 4 L 1 7 Z" className="fill-slate-400 dark:fill-slate-500" />
            </marker>

            {/* Pattern lưới nền nhẹ */}
            <pattern id="net-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" className="fill-fd-border/40" />
            </pattern>
          </defs>

          <rect width="860" height="560" fill="url(#net-grid)" rx="8" />

          {/* ================= TẦNG 1: ISP & TRANSIT ================= */}
          <g>
            {/* Vùng bao tầng ISP */}
            <rect
              x="20"
              y="15"
              width="820"
              height="80"
              rx="8"
              className="fill-blue-500/[0.04] stroke-blue-500/30"
              strokeDasharray="4 4"
            />
            <text x="35" y="34" className="text-[11px] font-bold fill-blue-600 dark:fill-blue-400 uppercase tracking-wider">
              TẦNG KẾT NỐI ISP & TRANSIT (EXTERNAL BGP & IXP)
            </text>

            {/* Các nhà mạng */}
            {/* FPT */}
            <g transform="translate(40, 42)">
              <rect width="130" height="42" rx="6" className="fill-fd-background stroke-fd-border shadow-sm" />
              <text x="65" y="22" textAnchor="middle" className="text-[12px] font-semibold fill-fd-foreground">FPT Telecom</text>
              <text x="65" y="34" textAnchor="middle" className="text-[10px] font-mono fill-fd-muted-foreground">Domestic & Int</text>
            </g>

            {/* VNPT / VTN */}
            <g transform="translate(190, 42)">
              <rect width="130" height="42" rx="6" className="fill-fd-background stroke-fd-border shadow-sm" />
              <text x="65" y="22" textAnchor="middle" className="text-[12px] font-semibold fill-fd-foreground">VTN / VNPT</text>
              <text x="65" y="34" textAnchor="middle" className="text-[10px] font-mono fill-fd-muted-foreground">Broadband Trunk</text>
            </g>

            {/* VNIX */}
            <g transform="translate(340, 42)">
              <rect width="140" height="42" rx="6" className="fill-fd-background stroke-blue-500/40 shadow-sm" />
              <text x="70" y="22" textAnchor="middle" className="text-[12px] font-semibold fill-blue-600 dark:fill-blue-400">VNIX (VNNIC)</text>
              <text x="70" y="34" textAnchor="middle" className="text-[10px] font-mono fill-fd-muted-foreground">National IXP</text>
            </g>

            {/* HTC */}
            <g transform="translate(500, 42)">
              <rect width="130" height="42" rx="6" className="fill-fd-background stroke-fd-border shadow-sm" />
              <text x="65" y="22" textAnchor="middle" className="text-[12px] font-semibold fill-fd-foreground">HTC Telecom</text>
              <text x="65" y="34" textAnchor="middle" className="text-[10px] font-mono fill-fd-muted-foreground">Inter-provincial</text>
            </g>

            {/* FPT-GIA */}
            <g transform="translate(650, 42)">
              <rect width="170" height="42" rx="6" className="fill-fd-background stroke-fd-border shadow-sm" />
              <text x="85" y="22" textAnchor="middle" className="text-[12px] font-semibold fill-fd-foreground">FPT-GIA-1 / 2</text>
              <text x="85" y="34" textAnchor="middle" className="text-[10px] font-mono fill-fd-muted-foreground">Dedicated Peering</text>
            </g>
          </g>

          {/* Đường liên kết ISP -> Router Core (BGP Peering) */}
          <g>
            <path d="M 430 95 L 430 145" className="stroke-blue-500" strokeWidth="2.5" markerEnd="url(#net-arrow-blue)" />
            {/* Nhãn liên kết */}
            <rect x="360" y="108" width="140" height="22" rx="4" className="fill-fd-background stroke-blue-500/30" />
            <text x="430" y="123" textAnchor="middle" className="text-[10px] font-mono font-medium fill-blue-600 dark:fill-blue-400">
              BGP Peering / Uplink
            </text>
          </g>

          {/* ================= TẦNG 2: ROUTER CORE ================= */}
          <g>
            <rect
              x="80"
              y="150"
              width="700"
              height="90"
              rx="8"
              className="fill-indigo-500/[0.04] stroke-indigo-500/30"
              strokeDasharray="4 4"
            />
            <text x="95" y="170" className="text-[11px] font-bold fill-indigo-600 dark:fill-indigo-400 uppercase tracking-wider">
              TẦNG ROUTER CORE (CORE LAYER — BGP ROUTING & TRAFFIC SHAPING)
            </text>

            {/* Core 1 */}
            <g transform="translate(130, 180)">
              <rect width="170" height="46" rx="6" className="fill-fd-background stroke-indigo-500/40 shadow-sm" />
              <circle cx="20" cy="23" r="5" className="fill-indigo-500" />
              <text x="95" y="22" textAnchor="middle" className="text-[12px] font-bold fill-fd-foreground">Core 1 Router</text>
              <text x="95" y="36" textAnchor="middle" className="text-[10px] font-mono fill-fd-muted-foreground">Full BGP Table</text>
            </g>

            {/* Đường interconnect giữa các Core Router */}
            <line x1="300" y1="203" x2="350" y2="203" className="stroke-indigo-400" strokeWidth="2" strokeDasharray="3 3" />

            {/* Core Nix */}
            <g transform="translate(350, 180)">
              <rect width="170" height="46" rx="6" className="fill-fd-background stroke-indigo-500/40 shadow-sm" />
              <circle cx="20" cy="23" r="5" className="fill-indigo-500" />
              <text x="95" y="22" textAnchor="middle" className="text-[12px] font-bold fill-fd-foreground">Core Nix Router</text>
              <text x="95" y="36" textAnchor="middle" className="text-[10px] font-mono fill-fd-muted-foreground">VNIX & Peering</text>
            </g>

            <line x1="520" y1="203" x2="570" y2="203" className="stroke-indigo-400" strokeWidth="2" strokeDasharray="3 3" />

            {/* Core Limit */}
            <g transform="translate(570, 180)">
              <rect width="170" height="46" rx="6" className="fill-fd-background stroke-indigo-500/40 shadow-sm" />
              <circle cx="20" cy="23" r="5" className="fill-indigo-500" />
              <text x="95" y="22" textAnchor="middle" className="text-[12px] font-bold fill-fd-foreground">Core Limit</text>
              <text x="95" y="36" textAnchor="middle" className="text-[10px] font-mono fill-fd-muted-foreground">QoS / Traffic Shaping</text>
            </g>
          </g>

          {/* Đường liên kết Router Core -> DSW (10G/40G Trunk) */}
          <g>
            <path d="M 430 240 L 430 285" className="stroke-emerald-500" strokeWidth="2.5" markerEnd="url(#net-arrow-emerald)" />
            <rect x="350" y="250" width="160" height="22" rx="4" className="fill-fd-background stroke-emerald-500/30" />
            <text x="430" y="265" textAnchor="middle" className="text-[10px] font-mono font-medium fill-emerald-600 dark:fill-emerald-400">
              10Gbps / 40Gbps Trunk
            </text>
          </g>

          {/* ================= TẦNG 3: DISTRIBUTION SWITCH (DSW) ================= */}
          <g>
            <rect
              x="140"
              y="290"
              width="580"
              height="85"
              rx="8"
              className="fill-emerald-500/[0.04] stroke-emerald-500/30"
              strokeDasharray="4 4"
            />
            <text x="155" y="310" className="text-[11px] font-bold fill-emerald-600 dark:fill-emerald-400 uppercase tracking-wider">
              TẦNG DISTRIBUTION SWITCH (DSW LAYER — AGGREGATION & L2/L3 SWITCHING)
            </text>

            {/* DSW 6 */}
            <g transform="translate(200, 320)">
              <rect width="200" height="44" rx="6" className="fill-fd-background stroke-emerald-500/40 shadow-sm" />
              <text x="100" y="21" textAnchor="middle" className="text-[12px] font-bold fill-fd-foreground">DSW 6 (Distribution)</text>
              <text x="100" y="35" textAnchor="middle" className="text-[10px] font-mono fill-fd-muted-foreground">VLAN Aggregation / Redundancy</text>
            </g>

            {/* Đường HA link giữa DSW 6 và DSW 7 */}
            <line x1="400" y1="342" x2="460" y2="342" className="stroke-emerald-500" strokeWidth="2" strokeDasharray="3 3" />
            <text x="430" y="335" textAnchor="middle" className="text-[9px] font-mono fill-emerald-600 dark:fill-emerald-400 font-semibold">HA Link</text>

            {/* DSW 7 */}
            <g transform="translate(460, 320)">
              <rect width="200" height="44" rx="6" className="fill-fd-background stroke-emerald-500/40 shadow-sm" />
              <text x="100" y="21" textAnchor="middle" className="text-[12px] font-bold fill-fd-foreground">DSW 7 (Distribution)</text>
              <text x="100" y="35" textAnchor="middle" className="text-[10px] font-mono fill-fd-muted-foreground">High Availability Backup</text>
            </g>
          </g>

          {/* Đường liên kết DSW -> ASW (1G/10G Trunk) */}
          <g>
            <path d="M 430 375 L 430 415" className="stroke-amber-500" strokeWidth="2.5" markerEnd="url(#net-arrow-amber)" />
            <rect x="355" y="383" width="150" height="22" rx="4" className="fill-fd-background stroke-amber-500/30" />
            <text x="430" y="398" textAnchor="middle" className="text-[10px] font-mono font-medium fill-amber-600 dark:fill-amber-400">
              1Gbps / 10Gbps Trunk
            </text>
          </g>

          {/* ================= TẦNG 4: ACCESS SWITCH (ASW) ================= */}
          <g>
            <rect
              x="60"
              y="420"
              width="740"
              height="60"
              rx="8"
              className="fill-amber-500/[0.04] stroke-amber-500/30"
              strokeDasharray="4 4"
            />
            <text x="75" y="438" className="text-[11px] font-bold fill-amber-600 dark:fill-amber-400 uppercase tracking-wider">
              TẦNG ACCESS SWITCH (ASW — TOP-OF-RACK TẠI TỪNG TỦ RACK)
            </text>

            {/* ASW Tủ 1 */}
            <g transform="translate(90, 444)">
              <rect width="180" height="30" rx="4" className="fill-fd-background stroke-amber-500/40 shadow-sm" />
              <text x="90" y="20" textAnchor="middle" className="text-[11px] font-semibold fill-fd-foreground">ASW Tủ Rack 1</text>
            </g>

            {/* ASW Tủ 2 */}
            <g transform="translate(290, 444)">
              <rect width="180" height="30" rx="4" className="fill-fd-background stroke-amber-500/40 shadow-sm" />
              <text x="90" y="20" textAnchor="middle" className="text-[11px] font-semibold fill-fd-foreground">ASW Tủ Rack 2</text>
            </g>

            {/* Dấu nối liên tiếp */}
            <text x="500" y="462" textAnchor="middle" className="text-sm font-bold fill-fd-muted-foreground">•••</text>

            {/* ASW Tủ n */}
            <g transform="translate(530, 444)">
              <rect width="240" height="30" rx="4" className="fill-fd-background stroke-amber-500/40 shadow-sm" />
              <text x="120" y="20" textAnchor="middle" className="text-[11px] font-semibold fill-fd-foreground">ASW Tủ Rack n... (ToR Switch)</text>
            </g>
          </g>

          {/* Đường liên kết ASW -> Khách hàng (RJ45 / DAC) */}
          <g>
            <path d="M 430 480 L 430 510" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#net-arrow-slate)" />
            <text x="430" y="498" textAnchor="middle" className="text-[9px] font-mono fill-fd-muted-foreground">
              Cáp RJ45 / Direct Attach Copper (DAC)
            </text>
          </g>

          {/* ================= TẦNG 5: KHÁCH HÀNG ================= */}
          <g transform="translate(230, 515)">
            <rect width="400" height="38" rx="6" className="fill-fd-muted/80 stroke-fd-border shadow-sm" />
            <text x="200" y="24" textAnchor="middle" className="text-[12px] font-bold fill-fd-foreground">
              🖥️ Máy chủ Khách hàng (Colocation / Dedicated / Cloud VMs)
            </text>
          </g>
        </svg>
      </div>

      <figcaption className="mt-3 text-center text-xs text-fd-muted-foreground border-t border-fd-border/50 pt-2.5">
        <strong>Hình 1:</strong> Kiến trúc phân tầng mạng ODS — luồng traffic định tuyến từ ISP/IXP qua Core, Distribution (DSW) và Access Switch (ASW) tại tủ rack đến máy chủ khách hàng.
      </figcaption>
    </figure>
  );
}

