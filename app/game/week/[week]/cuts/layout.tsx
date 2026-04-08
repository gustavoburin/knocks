export function generateStaticParams() {
  return Array.from({ length: 18 }, (_, i) => ({ week: String(i + 1) }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
