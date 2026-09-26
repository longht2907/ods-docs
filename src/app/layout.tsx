import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="vi" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          i18n={{
            locale: 'vi',
            translations: {
              'Search(search trigger)': 'Tìm kiếm',
              'Open Search(search trigger)(aria-label)': 'Mở tìm kiếm',
              'Search(search dialog)': 'Tìm kiếm',
              'Close Search(search dialog)(aria-label)': 'Đóng tìm kiếm',
              'No results found(search dialog)': 'Không tìm thấy kết quả',
              'On this page(table of contents)': 'Trong trang này',
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
