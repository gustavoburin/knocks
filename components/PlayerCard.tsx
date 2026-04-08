import Link from "next/link";
import { Player } from "@/lib/types";

const trendLabel = { up: "Rising", down: "Falling", steady: "Steady" } as const;
const trendColor = { up: "text-nflBlue", down: "text-nflRed", steady: "text-mute" } as const;

export function PlayerCard({ player, action }: { player: Player; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border border-bord rounded-xl p-4 bg-white">
      <Link href={`/game/player/${player.id}`} className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-11 h-11 rounded-full bg-surface border border-bord flex items-center justify-center text-xs font-semibold text-mute">
          {player.position}
        </div>
        <div className="min-w-0">
          <div className="font-semibold truncate">{player.firstName} {player.lastName}</div>
          <div className="text-xs text-mute mt-0.5">
            Age {player.age} · Exp {player.experience}y · {player.college}
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-4 pl-3">
        <div className="text-right">
          <div className="text-lg font-bold tabular-nums">{player.overall}</div>
          <div className={`text-[10px] uppercase tracking-wide ${trendColor[player.trend]}`}>{trendLabel[player.trend]}</div>
        </div>
        {action}
      </div>
    </div>
  );
}
