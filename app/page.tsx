import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between px-6 py-16 max-w-md mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-mute mb-6">A roster game</div>
        <h1 className="text-6xl font-black tracking-tighter">
          KN<span className="text-nflRed">O</span>CKS
        </h1>
        <p className="mt-6 text-base text-mute max-w-xs leading-relaxed">
          90 players. 53 spots. Every cut hits different.
        </p>
      </div>

      <div className="w-full">
        <Link
          href="/team-select"
          className="block w-full bg-nflBlue text-white text-center font-semibold py-4 rounded-2xl"
        >
          Start Your Franchise
        </Link>
        <p className="text-center text-xs text-mute mt-4">Preseason 2026 · Demo build</p>
      </div>
    </main>
  );
}
