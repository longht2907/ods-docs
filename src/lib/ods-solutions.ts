export type OdsSolutionIcon = 'phone' | 'cloud' | 'server' | 'managed' | 'license';

export interface OdsSolutionGroup {
  id: string;
  title: string;
  description: string;
  productUrl: `https://ods.vn/${string}`;
  icon: OdsSolutionIcon;
  products: readonly string[];
  docsUrl?: `/docs/${string}`;
}

/**
 * Public solution catalog based on the official ODS product portfolio.
 *
 * This catalog is intentionally separate from `docsProducts`: a solution may
 * exist commercially before its public technical documentation is available.
 */
export const odsSolutionGroups = [
  {
    id: 'ai-customer-experience',
    title: 'AI Contact Center',
    description:
      'Giải pháp tổng đài thông minh đa kênh tích hợp trợ lý ảo AI, Voice OTP và chiến dịch gọi tự động AutoCall.',
    productUrl: 'https://ods.vn/ai-contact-center',
    icon: 'phone',
    products: ['AutoCall', 'Voice Brandname', 'Voice OTP', 'Zalo OA'],
    docsUrl: '/docs/ai-contact-center',
  },
  {
    id: 'cloud-services',
    title: 'Dịch vụ Cloud',
    description:
      'Hạ tầng điện toán đám mây Private Cloud hiệu năng cao, lưu trữ Object Storage S3 và dịch vụ CloudFile chuẩn doanh nghiệp.',
    productUrl: 'https://ods.vn/private-cloud',
    icon: 'cloud',
    products: ['Private Cloud', 'Cloud Storage S3', 'CloudFile'],
    docsUrl: '/docs/cloudfile',
  },
  {
    id: 'digital-infrastructure',
    title: 'Hạ tầng số',
    description:
      'Chỗ đặt máy chủ Colocation tại Trung tâm dữ liệu tiêu chuẩn Tier 3, Server dùng riêng, Rack riêng và phòng chống DDoS đa lớp.',
    productUrl: 'https://ods.vn/cho-dat-may-chu-da-dich-vu',
    icon: 'server',
    products: ['Colocation', 'Dedicated Server', 'Private Rack', 'DDoS Mitigation'],
  },
  {
    id: 'managed-services',
    title: 'Dịch vụ quản trị',
    description:
      'Dịch vụ quản trị hệ thống 24/7/365, tối ưu hiệu năng hạ tầng, giám sát chủ động và ứng cứu sự cố theo cam kết SLA.',
    productUrl: 'https://ods.vn/dich-vu-quan-tri-may-chu',
    icon: 'managed',
    products: ['Server Management', 'Proactive Monitoring', 'SLA Response'],
  },
  {
    id: 'software-license',
    title: 'Bản quyền phần mềm',
    description:
      'Cung cấp bản quyền phần mềm doanh nghiệp chính hãng, Microsoft SPLA (Windows Server, SQL Server) và các control panel quản trị.',
    productUrl: 'https://ods.vn/ban-quyen-microsoft',
    icon: 'license',
    products: ['Microsoft SPLA', 'Plesk', 'cPanel', 'DirectAdmin'],
  },
] as const satisfies readonly OdsSolutionGroup[];
