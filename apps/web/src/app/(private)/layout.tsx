import React from "react";


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: RootLayoutProps) {
  return <>{children}</>;
}
