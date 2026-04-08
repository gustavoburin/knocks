"use client";
import { useState } from "react";
import { PlayerCard } from "@/components/PlayerCard";
import { MOCK_PLAYERS } from "@/lib/mockData";
import { Position } from "@/lib/types";

const FILTERS: ("ALL" | Position)[] = ["ALL", "QB", "RB", "WR", "TE", "OL", "DL", "LB", "CB", "S", "K"];

export default function Roster() {
  const [filter, setFilter] = useState<"ALL" | Position>("ALL");
  const players = filter === "ALL" ? MOCK_PLAYERS : MOCK_PLAYERS.filter((p) => p.position === filter);

  return (
    <main className="px-5 pt-8">
      <h1 className="text-3xl font-bold tracking-tight">Roster</h1>
      <p className="text-sm text-mute mt-1">{MOCK_PLAYERS.length} players in camp</p>

      <div className="-mx-5 px-5 mt-5 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                filter === f ? "bg-nflBlue text-white border-nflBlue" : "bg-white text-mute border-bord"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {players.map((p) => <PlayerCard key={p.id} player={p} />)}
      </div>
    </main>
  );
}
