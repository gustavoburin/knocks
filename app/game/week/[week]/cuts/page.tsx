"use client";
import Link from "next/link";
import { useState } from "react";
import { PlayerCard } from "@/components/PlayerCard";
import { MOCK_PLAYERS } from "@/lib/mockData";

export default function Cuts({ params }: { params: { week: string } }) {
  const [cut, setCut] = useState<Set<string>>(new Set());
  const required = 10;

  const toggle = (id: string) => {
    setCut((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <main className="px-5 pt-8">
      <Link href={`/game/week/${params.week}`} className="text-xs text-mute uppercase tracking-wider">← Back to Week</Link>
      <h1 className="text-3xl font-bold tracking-tight mt-3">Cut Day</h1>
      <p className="text-sm text-mute mt-1">Tap players to release them.</p>

      <div className="mt-5 sticky top-0 bg-white py-3 z-10 border-b border-bord -mx-5 px-5 flex items-center justify-between">
        <div className="text-sm">
          <span className="font-bold tabular-nums text-nflRed">{cut.size}</span>
          <span className="text-mute"> / {required} cuts made</span>
        </div>
        <button
          disabled={cut.size !== required}
          className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-nflRed text-white disabled:bg-bord disabled:text-mute"
        >
          Confirm
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {MOCK_PLAYERS.map((p) => {
          const isCut = cut.has(p.id);
          return (
            <div key={p.id} className={isCut ? "opacity-40" : ""}>
              <PlayerCard
                player={p}
                action={
                  <button
                    onClick={() => toggle(p.id)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                      isCut ? "bg-nflRed text-white border-nflRed" : "bg-white text-nflRed border-nflRed"
                    }`}
                  >
                    {isCut ? "Cut" : "Cut"}
                  </button>
                }
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
