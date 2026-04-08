import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_PLAYERS } from "@/lib/mockData";
import { SectionCard } from "@/components/SectionCard";

export function generateStaticParams() {
  return MOCK_PLAYERS.map((p) => ({ id: p.id }));
}

export default function PlayerProfile({ params }: { params: { id: string } }) {
  const p = MOCK_PLAYERS.find((x) => x.id === params.id);
  if (!p) return notFound();

  return (
    <main className="px-5 pt-8">
      <Link href="/game/roster" className="text-xs text-mute uppercase tracking-wider">← Back</Link>

      <div className="mt-4 flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-nflBlue font-semibold">{p.position}</div>
          <h1 className="text-3xl font-bold tracking-tight mt-1">{p.firstName}<br />{p.lastName}</h1>
          <p className="text-sm text-mute mt-2">{p.college} · Age {p.age} · {p.experience}y exp</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-black tabular-nums">{p.overall}</div>
          <div className="text-[10px] uppercase tracking-wider text-mute">Overall</div>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        <SectionCard title="Contract">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-mute text-xs uppercase">Cap Hit</div>
              <div className="font-semibold tabular-nums mt-1">${p.salaryM.toFixed(1)}M</div>
            </div>
            <div>
              <div className="text-mute text-xs uppercase">Trend</div>
              <div className="font-semibold mt-1 capitalize">{p.trend}</div>
            </div>
          </div>
        </SectionCard>

        {p.note && (
          <SectionCard title="Coach Note">
            <p className="italic text-ink leading-relaxed">"{p.note}"</p>
          </SectionCard>
        )}

        <Link
          href="/game/week/1/cuts"
          className="block w-full text-center py-3.5 rounded-xl border border-nflRed text-nflRed font-semibold"
        >
          Release Player
        </Link>
      </div>
    </main>
  );
}
