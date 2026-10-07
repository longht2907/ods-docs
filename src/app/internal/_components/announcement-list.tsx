import type { AnnouncementSummary } from '../_lib/announcements';
import Link from 'next/link';

interface AnnouncementListProps {
  announcements: AnnouncementSummary[];
  limit?: number;
}

function AnnouncementCards({
  announcements,
  limit,
}: AnnouncementListProps) {
  const visibleAnnouncements = limit
    ? announcements.slice(0, limit)
    : announcements;

  if (visibleAnnouncements.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-fd-muted/30 p-5 text-sm text-fd-muted-foreground">
        Hiện chưa có thông báo mới.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {visibleAnnouncements.map((announcement) => (
        <Link
          className="group rounded-xl border bg-fd-card p-5 text-fd-card-foreground transition-colors hover:border-fd-primary/50 hover:bg-fd-accent/40"
          href={announcement.url}
          key={announcement.url}
        >
          <time
            className="text-xs font-medium text-fd-muted-foreground"
            dateTime={announcement.date}
          >
            {announcement.formattedDate}
          </time>
          <h3 className="mt-2 text-base font-semibold group-hover:text-fd-primary">
            {announcement.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
            {announcement.description}
          </p>
        </Link>
      ))}
    </div>
  );
}

export function LatestAnnouncements({
  announcements,
}: Pick<AnnouncementListProps, 'announcements'>) {
  return (
    <section className="mb-8">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="m-0 text-2xl font-semibold">Thông báo mới</h2>
        <Link
          className="text-sm font-medium text-fd-primary hover:underline"
          href="/internal/announcements"
        >
          Xem tất cả thông báo
        </Link>
      </div>
      <AnnouncementCards announcements={announcements} limit={3} />
    </section>
  );
}

export function AnnouncementArchive({
  announcements,
}: Pick<AnnouncementListProps, 'announcements'>) {
  return <AnnouncementCards announcements={announcements} />;
}
