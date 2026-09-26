import type { Metadata } from 'next';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { homeOptions } from '@/lib/layout.shared';

export const metadata: Metadata = {
  title: 'Trung tâm Tài liệu ODS — Hạ tầng số, Cloud và AI',
  description:
    'Tài liệu kỹ thuật, cẩm nang vận hành và hướng dẫn tích hợp cho các giải pháp Hạ tầng số, Cloud và AI của ODS.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return <HomeLayout {...homeOptions()}>{children}</HomeLayout>;
}
