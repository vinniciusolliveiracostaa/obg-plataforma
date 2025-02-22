import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="min-h-screen h-screen min-w-screen w-screen">{children}</div>
    </>
  );
}
