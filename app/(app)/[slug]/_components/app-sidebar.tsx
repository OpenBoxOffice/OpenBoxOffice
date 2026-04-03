"use client"

import { LayoutDashboard, Settings, FileText, ChevronsUpDown, Building2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Logo } from "@/components/branding/logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Documents", icon: FileText },
  { label: "Settings", icon: Settings },
]

export function AppSidebar({ slug }: { slug: string }) {
  return (
    <Sidebar collapsible="icon">
      {/* ── Logo ── */}
      <SidebarHeader className="items-center justify-center border-b py-4 max-h-16">
        {/* expanded: text logo — width drives the size, fills most of the sidebar */}
        <Logo
          variant="text"
          size={36}
          className="group-data-[collapsible=icon]:hidden"
        />
        {/* collapsed: square logo — fits the icon-width rail */}
        <Logo
          variant="square"
          size={16}
          className="hidden group-data-[collapsible=icon]:block"
        />
      </SidebarHeader>

      {/* ── Nav ── */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton tooltip={item.label}>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Profile + org switcher ── */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  tooltip="Profile"
                  className="data-[state=open]:bg-sidebar-accent"
                >
                  <Avatar size="sm">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col text-left leading-tight">
                    <span className="truncate text-sm font-medium">User Name</span>
                    <span className="text-sidebar-foreground/60 truncate text-xs">
                      user@example.com
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" className="w-56">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Organization
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <Building2 className="size-4" />
                  <span className="truncate">{slug}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Account
                </DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
