import { CoachNote } from "@/lib/types";

export function CoachQuote({ note }: { note: CoachNote }) {
  return (
    <div className="border-l-2 border-nflBlue pl-4 py-1">
      <p className="italic text-ink leading-relaxed">"{note.text}"</p>
      <p className="text-xs text-mute mt-2">
        <span className="font-semibold text-ink">{note.coach}</span> · {note.role}
      </p>
    </div>
  );
}
