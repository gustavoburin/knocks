import Link from "next/link";
import { WeekHeader } from "@/components/WeekHeader";
import { SectionCard } from "@/components/SectionCard";
import { CoachQuote } from "@/components/CoachQuote";
import { BoxScore } from "@/components/BoxScore";
import { PlayerCard } from "@/components/PlayerCard";
import { MOCK_COACH_NOTES, MOCK_BOX_SCORE, MOCK_PLAYERS, MOCK_WEEK_REPORT, MOCK_FRANCHISE } from "@/lib/mockData";

export function generateStaticParams() {
  return Array.from({ length: 18 }, (_, i) => ({ week: String(i + 1) }));
}

export default function WeekHub({ params }: { params: { week: string } }) {
  const week = params.week;
  const snapshot = MOCK_PLAYERS.slice(0, 4);

  return (
    <main>
      <WeekHeader title={`Week ${week} — Training Camp`} subtitle="Cuts due before next practice" />

      <div className="px-5 py-5 space-y-5">
        {/* Cuts CTA */}
        <div className="rounded-2xl p-5 border border-bord bg-white shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-nflRed font-semibold">Cut Day</div>
              <div className="text-2xl font-bold mt-1">10 cuts required</div>
              <div className="text-sm text-mute mt-1">Trim the roster from 90 to 80 before Week 2.</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold tabular-nums">90</div>
              <div className="text-[10px] uppercase tracking-wider text-mute">on roster</div>
            </div>
          </div>
          <Link
            href={`/game/week/${week}/cuts`}
            className="mt-5 block w-full bg-nflRed text-white text-center font-semibold py-3.5 rounded-xl"
          >
            Make Cuts
          </Link>
        </div>

        {/* Week Report */}
        <SectionCard title="Week Report">
          <div
            className="h-40 rounded-xl mb-4 border border-bord"
            style={{ background: `linear-gradient(0deg, rgba(0,0,0,0.35), rgba(0,0,0,0)), url(${process.env.NEXT_PUBLIC_BASE_PATH}/img/weekreportcover.jpg) center/cover` }}
          />
          {MOCK_WEEK_REPORT.body.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-ink mb-3 last:mb-0">{p}</p>
          ))}
          <ul className="mt-4 pt-4 border-t border-bord space-y-2">
            {MOCK_WEEK_REPORT.highlights.map((h) => (
              <li key={h} className="text-sm text-mute flex gap-2">
                <span className="text-nflBlue">·</span>{h}
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Coaches */}
        <SectionCard title="From the Staff">
          <div className="space-y-5">
            {MOCK_COACH_NOTES.map((n) => <CoachQuote key={n.coach} note={n} />)}
          </div>
        </SectionCard>

        {/* Preseason Game */}
        <SectionCard title="Preseason Game">
          <BoxScore score={MOCK_BOX_SCORE} />
        </SectionCard>

        {/* Roster Snapshot */}
        <SectionCard
          title="Roster Snapshot"
          action={<Link href="/game/roster" className="text-xs text-nflBlue font-semibold uppercase tracking-wider">View All</Link>}
        >
          <div className="space-y-3">
            {snapshot.map((p) => <PlayerCard key={p.id} player={p} />)}
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
