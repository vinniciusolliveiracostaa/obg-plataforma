import React from "react";


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: RootLayoutProps) {
  return <>{children}</>;
}
