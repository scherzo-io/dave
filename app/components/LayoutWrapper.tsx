"use client";

import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  
  return (
    <main className={isHomepage ? "" : "pt-16"}>
      {children}
    </main>
  );
} 