"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ChevronsUpDown,
  LogOut,
  Plus,
  Settings,
  User,
  Building2,
  Check,
} from "lucide-react";

import { authClient } from "@/app/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function UserOrganizationSwitcher() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const { data: organizations, isPending: isOrgsPending } = authClient.useListOrganizations();
  const { data: activeOrg, isPending: isActiveOrgPending } = authClient.useActiveOrganization();
  const [isSwitching, setIsSwitching] = React.useState(false);

  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const handleSwitchOrg = async (orgId: string) => {
    setIsSwitching(true);
    try {
      await authClient.organization.setActive({
        organizationId: orgId,
      });
      // Find the organization to get its slug for navigation
      const org = organizations?.find(o => o.id === orgId);
      if (org) {
        // use window.location.href for a full refresh to ensure all session state is updated
        window.location.href = `/${org.slug}`;
      }
    } finally {
      setIsSwitching(false);
    }
  };

  if (isSessionPending || !user) {
    return (
      <div className="h-9 w-48 animate-pulse rounded-md bg-muted/50" />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full justify-start gap-2 px-2 hover:bg-accent/50 focus-visible:ring-0",
            isSwitching && "opacity-50 pointer-events-none"
          )}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {activeOrg ? (
              <Avatar className="h-6 w-6 rounded-sm">
                <AvatarImage src={activeOrg.logo || undefined} alt={activeOrg.name} />
                <AvatarFallback className="rounded-sm bg-primary/10 text-[10px] font-medium text-primary uppercase">
                  {activeOrg.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="h-6 w-6 rounded-sm">
                <AvatarFallback className="rounded-sm bg-muted text-[10px] font-medium uppercase">
                  <User className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col items-start gap-0.5 overflow-hidden text-left">
              <span className="truncate text-sm font-medium leading-none">
                {activeOrg?.name || user.name}
              </span>
              <span className="truncate text-[10px] text-muted-foreground leading-none">
                {activeMember ? activeMember.role.charAt(0).toUpperCase() + activeMember.role.slice(1) : (activeOrg ? "Organization" : "Personal Account")}
              </span>
            </div>
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start" sideOffset={8}>
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Personal Account
        </DropdownMenuLabel>
        <DropdownMenuItem
          className="flex items-center gap-2 py-2"
          onClick={() => {
            // Switch to personal if supported, or just navigate to home
            router.push("/home");
          }}
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-[10px] font-medium text-primary uppercase">
              {user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-sm font-medium">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
          </div>
          {!activeOrg && <Check className="ml-auto h-4 w-4 opacity-50" />}
        </DropdownMenuItem>

        {organizations && organizations.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
              Organizations
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {organizations.map((org) => (
                <DropdownMenuItem
                  key={org.id}
                  className="flex items-center gap-2 py-2"
                  onClick={() => handleSwitchOrg(org.id)}
                >
                  <Avatar className="h-6 w-6 rounded-sm">
                    <AvatarImage src={org.logo || undefined} alt={org.name} />
                    <AvatarFallback className="rounded-sm bg-primary/10 text-[10px] font-medium text-primary uppercase">
                      {org.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate text-sm">{org.name}</span>
                  {activeOrg?.id === org.id && (
                    <Check className="ml-auto h-4 w-4 opacity-50" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="gap-2"
            onClick={() => router.push("/setup")}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-sm border bg-background">
              <Plus className="h-4 w-4" />
            </div>
            <span className="text-sm">Create Organization</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2" onClick={() => router.push("/settings")}>
            <Settings className="h-4 w-4 opacity-70" />
            <span className="text-sm">Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 opacity-70" />
            <span className="text-sm">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
