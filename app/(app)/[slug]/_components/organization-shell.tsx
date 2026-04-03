"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { Toolbar } from "./toolbar"

export function OrganizationShell({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar slug={slug} />
      <SidebarInset>
        <Toolbar slug={slug} />
        <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
