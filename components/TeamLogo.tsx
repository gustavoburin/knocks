import { Team } from "@/lib/types";

export function TeamLogo({ team, size = 40 }: { team: Team; size?: number }) {
  const initials = team.mascot.slice(0, 2).toUpperCase();
  if (team.image) {
    return (
      <img
        src={team.image}
        alt={`${team.name} logo`}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="flex items-center justify-center rounded-full font-bold text-white"
      style={{ background: team.colors.primary, width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}
