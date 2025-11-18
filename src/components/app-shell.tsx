'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  ArrowRightLeft,
  BarChart3,
  Landmark,
  LayoutDashboard,
  LogOut,
  User,
} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Logo} from './logo';
import {ReactNode} from 'react';
import {Button} from './ui/button';

const navItems = [
  {href: '/', label: 'Dashboard', icon: <LayoutDashboard />},
  {href: '/transacciones', label: 'Transacciones', icon: <ArrowRightLeft />},
  {href: '/cuentas', label: 'Cuentas', icon: <Landmark />},
  {href: '/reportes', label: 'Reportes', icon: <BarChart3 />},
];

export function AppShell({children}: {children: ReactNode}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2 p-2">
            <Logo className="size-8 shrink-0 text-sidebar-primary" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-sidebar-foreground">
                Comercial Yaneth
              </span>
              <span className="text-xs text-sidebar-foreground/70">
                Control de Agentes
              </span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    icon={item.icon}
                    tooltip={item.label}
                  >
                    {item.label}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-sm">
          <SidebarTrigger className="md:hidden" />
          <div />
          <UserMenu />
        </header>
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-8 rounded-full"
          aria-label="Abrir menú de usuario"
        >
          <Avatar className="size-8">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <AvatarFallback>CY</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Yaneth</p>
            <p className="text-xs leading-none text-muted-foreground">
              admin@comercialyaneth.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
