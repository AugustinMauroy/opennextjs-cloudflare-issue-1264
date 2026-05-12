export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>
        <h2>Marketing Navigation</h2>
      </nav>
      <main>{children}</main>
    </div>
  );
}
