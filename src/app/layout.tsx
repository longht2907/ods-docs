import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import OdsSearchDialog from '@/components/search-dialog';

const inter = Inter({
  subsets: ['latin'],
});

function getMetadataBase(): URL {
  const configuredUrl = process.env.ODS_DOCS_SITE_URL?.trim();

  if (!configuredUrl) {
    if (process.env.NODE_ENV !== 'production') {
      return new URL('http://localhost:3000');
    }

    throw new Error(
      'ODS_DOCS_SITE_URL is required for production builds so social metadata never falls back to localhost.',
    );
  }

  let url: URL;
  try {
    url = new URL(configuredUrl);
  } catch {
    throw new Error('ODS_DOCS_SITE_URL must be a valid absolute HTTP(S) origin.');
  }

  const isHttp = url.protocol === 'http:' || url.protocol === 'https:';
  const hasOriginOnly =
    url.pathname === '/' && !url.username && !url.password && !url.search && !url.hash;
  const isLoopback =
    url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '[::1]';

  if (!isHttp || !hasOriginOnly) {
    throw new Error(
      'ODS_DOCS_SITE_URL must contain only an HTTP(S) origin without credentials, path, query, or hash.',
    );
  }
  if (process.env.NODE_ENV === 'production' && isLoopback) {
    throw new Error('ODS_DOCS_SITE_URL must not use a loopback host in production.');
  }

  return url;
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="vi" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{ SearchDialog: OdsSearchDialog }}
          i18n={{
            locale: 'vi',
            translations: {
              'Search(search trigger)': 'Tìm kiếm',
              'Open Search(search trigger)(aria-label)': 'Mở tìm kiếm',
              'Search(search dialog)': 'Tìm kiếm',
              'Close Search(search dialog)(aria-label)': 'Đóng tìm kiếm',
              'No results found(search dialog)': 'Không tìm thấy kết quả',
              'On this page(table of contents)': 'On this page',
              'Copy Markdown(page actions)': 'Sao chép Markdown',
              'Open(page actions)': 'Mở',
              'Previous Page(pagination)': 'Trang trước',
              'Next Page(pagination)': 'Trang tiếp theo',
              'Toggle Menu(home layout header)(aria-label)': 'Mở hoặc đóng menu',
              'Toggle Theme(theme switcher)(aria-label)': 'Đổi giao diện sáng tối',
              'Light(theme switcher)(aria-label)': 'Sáng',
              'Dark(theme switcher)(aria-label)': 'Tối',
              'System(theme switcher)(aria-label)': 'Theo hệ thống',
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
