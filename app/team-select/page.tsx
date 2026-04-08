import Link from "next/link";
import { MOCK_TEAMS } from "@/lib/mockData";

export default function TeamSelect() {
  return (
    <main className="min-h-screen max-w-md mx-auto px-5 pt-10 pb-16">
      <Link href="/" className="text-xs text-mute uppercase tracking-wider">← Back</Link>
      <h1 className="text-3xl font-bold tracking-tight mt-4">Pick your franchise</h1>
      <p className="text-sm text-mute mt-2">Four teams. One job. Build the 53.</p>

      <ul className="mt-8 divide-y divide-bord border-y border-bord">
        {MOCK_TEAMS.map((team) => (
          <li key={team.id}>
            <Link
              href="/game/week/1"
              className="flex items-center gap-4 py-4"
            >
              <div className="w-16 h-16 flex items-center justify-center shrink-0">
                {team.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={team.image} alt={team.name} className="w-16 h-16 object-contain" />
                ) : (
                  <span
                    className="w-10 h-10 rounded-full border border-bord"
                    style={{ background: team.colors.primary }}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-mute uppercase tracking-wider">{team.city}</div>
                <div className="text-base font-semibold leading-tight">{team.mascot}</div>
              </div>
              <span className="text-mute text-lg shrink-0">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
