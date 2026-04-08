"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/game/week/1", label: "Week", match: "/game/week" },
  { href: "/game/roster", label: "Roster", match: "/game/roster" },
  { href: "/game/waivers", label: "Waivers", match: "/game/waivers" },
  { href: "/game/staff", label: "Staff", match: "/game/staff" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-bord">
      <div className="max-w-md mx-auto grid grid-cols-4">
        {items.map((it) => {
          const active = pathname.startsWith(it.match);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`py-3 text-center text-xs font-semibold uppercase tracking-wide ${active ? "text-nflBlue" : "text-mute"}`}
            >
              {it.label}
              <div className={`mx-auto mt-1 h-0.5 w-6 rounded-full ${active ? "bg-nflBlue" : "bg-transparent"}`} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
