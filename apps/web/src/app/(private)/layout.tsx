






export default function PrivateLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="min-h-screen h-screen max-h-screen">{children}</main>
    );
  }
  