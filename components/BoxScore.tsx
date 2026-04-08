import { BoxScore as BoxScoreT } from "@/lib/types";
import { MOCK_FRANCHISE } from "@/lib/mockData";

export function BoxScore({ score }: { score: BoxScoreT }) {
  const won = score.teamScore > score.oppScore;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs uppercase text-mute tracking-wide">{MOCK_FRANCHISE.name}</div>
          <div className="text-3xl font-bold tabular-nums">{score.teamScore}</div>
        </div>
        <div className={`text-xs font-semibold uppercase tracking-wider ${won ? "text-nflBlue" : "text-nflRed"}`}>
          {won ? "Win" : "Loss"}
        </div>
        <div className="text-right">
          <div className="text-xs uppercase text-mute tracking-wide">{score.opponent}</div>
          <div className="text-3xl font-bold tabular-nums">{score.oppScore}</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center pt-4 border-t border-bord">
        <Stat label="Pass Yds" value={score.passingYds} />
        <Stat label="Rush Yds" value={score.rushingYds} />
        <Stat label="Turnovers" value={score.turnovers} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-lg font-semibold tabular-nums">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-mute">{label}</div>
    </div>
  );
}
