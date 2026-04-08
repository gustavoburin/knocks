import { TeamLogo } from "./TeamLogo";
import { MOCK_FRANCHISE } from "@/lib/mockData";

export function WeekHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="px-5 pt-6 pb-4 bg-white border-b border-bord">
      <div className="flex items-center gap-3 mb-4">
        <TeamLogo team={MOCK_FRANCHISE} size={36} />
        <div>
          <div className="text-sm font-semibold leading-tight">{MOCK_FRANCHISE.name}</div>
          <div className="text-xs text-mute">Preseason · 2026</div>
        </div>
      </div>
      <h1 className="text-2xl font-bold tracking-tight uppercase">{title}</h1>
      {subtitle && <p className="text-sm text-mute mt-1">{subtitle}</p>}
    </header>
  );
}
