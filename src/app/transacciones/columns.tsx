'use client';

import type {ColumnDef} from '@tanstack/react-table';
import type {Transaction} from '@/lib/types';
import {accounts, locations, transactionStatuses, users} from '@/lib/data';
import {formatCurrency} from '@/lib/utils';
import {Badge} from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {MoreHorizontal} from 'lucide-react';
import {TransactionDetailsDialog} from './transaction-details-dialog';

const transactionTypeMap: Record<string, string> = {
  deposito: 'Depósito',
  retiro: 'Retiro',
  transferencia: 'Transferencia',
  pago_proveedor: 'Pago Proveedor',
  ingreso_caja: 'Ingreso Caja',
  gasto_caja: 'Gasto Caja',
  otro: 'Otro',
};

const transactionVariantMap: Record<
  string,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  deposito: 'default',
  ingreso_caja: 'default',
  retiro: 'destructive',
  gasto_caja: 'destructive',
  transferencia: 'secondary',
  pago_proveedor: 'outline',
  otro: 'secondary',
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({row}) => {
      const type = row.getValue('type') as string;
      return (
        <Badge variant={transactionVariantMap[type]}>
          {transactionTypeMap[type]}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Monto</div>,
    cell: ({row}) => {
      const amount = parseFloat(row.getValue('amount'));
      return (
        <div className="text-right font-medium">{formatCurrency(amount)}</div>
      );
    },
  },
  {
    accessorKey: 'statusId',
    header: 'Estado',
    cell: ({row}) => {
      const statusId = row.getValue('statusId') as string;
      const status = transactionStatuses.find((s) => s.id === statusId);
      if (!status) return 'N/A';

      let variant: 'default' | 'secondary' | 'destructive' = 'secondary';
      if (status.name === 'Completada') variant = 'default';
      if (status.name === 'Anulada') variant = 'destructive';

      return <Badge variant={variant}>{status.name}</Badge>;
    },
  },
  {
    accessorKey: 'locationId',
    header: 'Localidad',
    cell: ({row}) => {
      const locationId = row.getValue('locationId') as string;
      return locations.find((l) => l.id === locationId)?.name ?? 'N/A';
    },
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
    cell: ({row}) => {
      const date = new Date(row.getValue('date'));
      return date.toLocaleDateString('es-HN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
  },
  {
    id: 'actions',
    cell: ({row}) => {
      const transaction = row.original;
      return (
        <TransactionDetailsDialog transaction={transaction}>
          {(openDialog) => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menú</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem onClick={openDialog}>
                  Ver detalles
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                  Anular transacción
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </TransactionDetailsDialog>
      );
    },
  },
];
