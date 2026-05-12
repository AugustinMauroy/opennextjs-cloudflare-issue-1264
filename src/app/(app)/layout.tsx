export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>
        <h2>App Navigation</h2>
      </nav>
      <main>{children}</main>
    </div>
  );
}
