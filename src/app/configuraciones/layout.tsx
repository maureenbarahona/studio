'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Banknote,
  Building,
  Globe,
  Languages,
  Users,
  Shield,
  Briefcase,
  Workflow,
  Map,
} from 'lucide-react';
import PageHeader from '@/components/page-header';

const sidebarNavItems = [
  {
    title: 'General',
    items: [
      {
        title: 'Empresa',
        href: '/configuraciones/empresa',
        icon: <Building className="size-4" />,
      },
      {
        title: 'Sucursales',
        href: '/configuraciones/sucursales',
        icon: <Briefcase className="size-4" />,
      },
    ],
  },
  {
    title: 'Usuarios',
    items: [
      {
        title: 'Usuarios',
        href: '/configuraciones/usuarios',
        icon: <Users className="size-4" />,
      },
      {
        title: 'Roles de Usuario',
        href: '/configuraciones/roles',
        icon: <Shield className="size-4" />,
      },
    ],
  },
  {
    title: 'Sistema',
    items: [
      {
        title: 'Estatus de Transacciones',
        href: '/configuraciones/estatus',
        icon: <Workflow className="size-4" />,
      },
      {
        title: 'Monedas',
        href: '/configuraciones/monedas',
        icon: <Banknote className="size-4" />,
      },
      {
        title: 'Países',
        href: '/configuraciones/paises',
        icon: <Map className="size-4" />,
      },
      {
        title: 'Ciudades',
        href: '/configuraciones/ciudades',
        icon: <Globe className="size-4" />,
      },
      {
        title: 'Idiomas',
        href: '/configuraciones/idiomas',
        icon: <Languages className="size-4" />,
      },
    ],
  },
];

interface SettingsLayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Configuraciones"
        description="Administra usuarios, personalización y otros ajustes del sistema."
      />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <nav className="flex flex-col space-y-4">
            {sidebarNavItems.map((group) => (
              <div key={group.title}>
                <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
                  {group.title}
                </h4>
                <div className="flex flex-col space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                        pathname === item.href
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
