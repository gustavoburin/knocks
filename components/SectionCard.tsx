export function SectionCard({ title, action, children }: { title?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-bord rounded-2xl shadow-card p-5">
      {(title || action) && (
        <header className="flex items-center justify-between mb-4">
          {title && <h2 className="text-base font-semibold tracking-tight">{title}</h2>}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
