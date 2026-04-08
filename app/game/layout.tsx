import { BottomNav } from "@/components/BottomNav";

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-md mx-auto pb-24 min-h-screen bg-white">
      {children}
      <BottomNav />
    </div>
  );
}
