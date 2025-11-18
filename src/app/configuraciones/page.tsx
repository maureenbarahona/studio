'use client';

import PageHeader from '@/components/page-header';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {UsersTable} from './users-table';
import {TransactionStatusesTable} from './transaction-statuses-table';

export default function ConfiguracionesPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Configuraciones"
        description="Administra usuarios y estados del sistema."
      />

      <Tabs defaultValue="usuarios" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="estatus">Estatus de Transacciones</TabsTrigger>
        </TabsList>
        <TabsContent value="usuarios" className="pt-4">
          <UsersTable />
        </TabsContent>
        <TabsContent value="estatus" className="pt-4">
          <TransactionStatusesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
