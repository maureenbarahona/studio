'use client';

import {useState} from 'react';
import type {TransactionStatus} from '@/lib/types';
import {transactionStatuses as initialStatuses} from '@/lib/data';
import {DataTable} from '@/app/transacciones/data-table';
import {Button} from '@/components/ui/button';
import {PlusCircle} from 'lucide-react';
import type {ColumnDef} from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {MoreHorizontal} from 'lucide-react';

const columns: ColumnDef<TransactionStatus>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
  },
  {
    id: 'actions',
    cell: ({row}) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TransactionStatusesTable() {
  const [statuses, setStatuses] = useState<TransactionStatus[]>(initialStatuses);

  // TODO: Implementar la adición de estados
  const handleAddStatus = () => {
    console.log('Añadir nuevo estado');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button onClick={handleAddStatus}>
          <PlusCircle className="mr-2" />
          Añadir Estado
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={statuses}
        filterColumn="name"
        filterPlaceholder="Filtrar por nombre..."
      />
    </div>
  );
}
