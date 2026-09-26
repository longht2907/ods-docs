export type OdsSolutionIcon = 'phone' | 'cloud' | 'server' | 'managed' | 'license';

export interface OdsSolutionProduct {
  name: string;
  productUrl: `https://ods.vn/${string}`;
  docsSlug?: string;
}

export interface OdsSolutionGroup {
  id: string;
  title: string;
  description: string;
  productUrl: `https://ods.vn/${string}`;
  icon: OdsSolutionIcon;
  products: readonly OdsSolutionProduct[];
}

/**
 * Canonical public catalog for the ODS solution portfolio.
 *
 * Documentation availability belongs to each product through `docsSlug`.
 * Group-level links always point to the corresponding solution page on ods.vn.
 */
export const odsSolutionGroups: readonly OdsSolutionGroup[] = [
  {
    id: 'ai-customer-experience',
    title: 'AI Contact Center',
    description:
      'Giải pháp tổng đài thông minh đa kênh tích hợp trợ lý ảo AI, Voice OTP và chiến dịch gọi tự động AutoCall.',
    productUrl: 'https://ods.vn/ai-contact-center',
    icon: 'phone',
    products: [
      {
        name: 'AI Contact Center',
        productUrl: 'https://ods.vn/ai-contact-center',
        docsSlug: 'ai-contact-center',
      },
      { name: 'AutoCall', productUrl: 'https://ods.vn/goi-tu-dong' },
      { name: 'Voice Brandname', productUrl: 'https://ods.vn/voice-brandname' },
      { name: 'Voice OTP', productUrl: 'https://ods.vn/ai-contact-center' },
      {
        name: 'Zalo OA',
        productUrl: 'https://ods.vn/tong-dai-ao-tich-hop-zalo-oa',
      },
    ],
  },
  {
    id: 'cloud-services',
    title: 'Dịch vụ Cloud',
    description:
      'Hạ tầng điện toán đám mây Private Cloud hiệu năng cao, lưu trữ Object Storage S3 và dịch vụ CloudFile chuẩn doanh nghiệp.',
    productUrl: 'https://ods.vn/private-cloud',
    icon: 'cloud',
    products: [
      { name: 'Private Cloud', productUrl: 'https://ods.vn/private-cloud' },
      { name: 'Cloud Storage S3', productUrl: 'https://ods.vn/cloud-storage-s3' },
      {
        name: 'CloudFile',
        productUrl: 'https://ods.vn/cloud-files',
        docsSlug: 'cloudfile',
      },
    ],
  },
  {
    id: 'digital-infrastructure',
    title: 'Hạ tầng số',
    description:
      'Chỗ đặt máy chủ Colocation tại Trung tâm dữ liệu tiêu chuẩn Tier 3, Server dùng riêng, Rack riêng và phòng chống DDoS đa lớp.',
    productUrl: 'https://ods.vn/cho-dat-may-chu-da-dich-vu',
    icon: 'server',
    products: [
      {
        name: 'Colocation',
        productUrl: 'https://ods.vn/cho-dat-may-chu-da-dich-vu',
      },
      { name: 'Dedicated Server', productUrl: 'https://ods.vn/dedicated-server' },
      {
        name: 'Private Rack',
        productUrl: 'https://ods.vn/cho-dat-may-chu-da-dich-vu',
      },
      {
        name: 'DDoS Mitigation',
        productUrl: 'https://ods.vn/cho-dat-may-chu-da-dich-vu',
      },
    ],
  },
  {
    id: 'managed-services',
    title: 'Dịch vụ quản trị',
    description:
      'Dịch vụ quản trị hệ thống 24/7/365, tối ưu hiệu năng hạ tầng, giám sát chủ động và ứng cứu sự cố theo cam kết SLA.',
    productUrl: 'https://ods.vn/dich-vu-quan-tri-may-chu',
    icon: 'managed',
    products: [
      {
        name: 'Server Management',
        productUrl: 'https://ods.vn/dich-vu-quan-tri-may-chu',
      },
      {
        name: 'Proactive Monitoring',
        productUrl: 'https://ods.vn/dich-vu-quan-tri-may-chu',
      },
      {
        name: 'SLA Response',
        productUrl: 'https://ods.vn/dich-vu-quan-tri-may-chu',
      },
    ],
  },
  {
    id: 'software-license',
    title: 'Bản quyền phần mềm',
    description:
      'Cung cấp bản quyền phần mềm doanh nghiệp chính hãng, Microsoft SPLA (Windows Server, SQL Server) và các control panel quản trị.',
    productUrl: 'https://ods.vn/ban-quyen-microsoft',
    icon: 'license',
    products: [
      { name: 'Microsoft SPLA', productUrl: 'https://ods.vn/ban-quyen-microsoft' },
      { name: 'Plesk', productUrl: 'https://ods.vn/ban-quyen-microsoft' },
      { name: 'cPanel', productUrl: 'https://ods.vn/ban-quyen-microsoft' },
      { name: 'DirectAdmin', productUrl: 'https://ods.vn/ban-quyen-microsoft' },
    ],
  },
];
