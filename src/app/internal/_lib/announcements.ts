import { internalSource } from '@/lib/source';

const ANNOUNCEMENT_SLUG = /^(\d{4})-(\d{2})-(\d{2})-[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface AnnouncementSummary {
  date: string;
  formattedDate: string;
  title: string;
  description: string;
  url: string;
}

function parseAnnouncementDate(slug: string): string {
  const match = ANNOUNCEMENT_SLUG.exec(slug);
  if (!match) {
    throw new Error(
      `[internal announcements] Slug "${slug}" không hợp lệ. Dùng định dạng YYYY-MM-DD-ten-thong-bao.`,
    );
  }

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error(
      `[internal announcements] Ngày trong slug "${slug}" không hợp lệ.`,
    );
  }

  return `${yearText}-${monthText}-${dayText}`;
}

function formatDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

export function getAnnouncements(): AnnouncementSummary[] {
  return internalSource
    .getPages()
    .filter(
      (page) =>
        page.slugs.length === 2 && page.slugs[0] === 'announcements',
    )
    .map((page) => {
      const slug = page.slugs[1];
      const date = parseAnnouncementDate(slug);
      const description = page.data.description?.trim();

      if (!description) {
        throw new Error(
          `[internal announcements] "${page.path}" phải có description không rỗng.`,
        );
      }

      return {
        date,
        formattedDate: formatDate(date),
        title: page.data.title,
        description,
        url: page.url,
      };
    })
    .sort((left, right) => right.date.localeCompare(left.date));
}
