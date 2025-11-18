'use client';

import PageHeader from '@/components/page-header';
import { redirect } from 'next/navigation';

export default function ConfiguracionesPage() {
  // Redirige a la primera subpágina por defecto.
  redirect('/configuraciones/empresa');

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Configuraciones"
        description="Administra usuarios y estados del sistema."
      />
      {/* El contenido se renderizará a través de layout.tsx y las subpáginas */}
    </div>
  );
}
