import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface ActivityItem {
  id: string;
  title: string;
  meta?: string;
  time: string;
  avatarUrl?: string;
  initials: string;
}

export interface ActivityListProps {
  items: ActivityItem[];
}

/**
 * Daftar aktivitas terbaru dengan avatar dan waktu.
 *
 * Aksi tambahan per item (mis. terima/tolak jadwal) disediakan oleh pemanggil
 * lewat komposisi, bukan dipaksakan di dalam list ini.
 */
export function ActivityList({ items }: ActivityListProps) {
  return (
    <ul className="flex flex-col divide-y">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
        >
          <Avatar>
            {item.avatarUrl ? <AvatarImage src={item.avatarUrl} alt="" /> : null}
            <AvatarFallback>{item.initials}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 gap-0.5">
            <span className="text-sm font-medium">{item.title}</span>
            {item.meta ? (
              <span className="text-xs text-muted-foreground">{item.meta}</span>
            ) : null}
          </div>
          <time className="shrink-0 text-xs text-muted-foreground">
            {item.time}
          </time>
        </li>
      ))}
    </ul>
  );
}
