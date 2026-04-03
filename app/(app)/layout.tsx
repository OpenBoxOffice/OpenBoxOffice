import * as React from "react";
import { UserOrganizationSwitcher } from "@/components/auth/user-organization-switcher";
import { Logo } from "@/components/branding/logo";
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
        <Link href="/home" className="flex items-center gap-2 font-semibold">
          <Logo variant="square" size={24} />
          <span className="sr-only md:not-sr-only text-sm font-bold tracking-tight">
            OpenBoxOffice
          </span>
        </Link>
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <UserOrganizationSwitcher />
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        {children}
      </main>
    </div>
  );
}
