
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type {Transaction} from '@/lib/types';
import {accounts, locations} from '@/lib/data';
import {formatCurrency} from '@/lib/utils';
import {useState, type ReactNode} from 'react';

interface TransactionDetailsDialogProps {
  transaction: Transaction;
  children: ReactNode;
}

const transactionTypeMap: Record<string, string> = {
  deposito: 'Depósito',
  retiro: 'Retiro',
  transferencia: 'Transferencia',
  pago_proveedor: 'Pago Proveedor',
  ingreso_caja: 'Ingreso Caja',
  gasto_caja: 'Gasto Caja',
  otro: 'Otro',
};

function DetailItem({label, value}: {label: string; value?: string | null}) {
  if (!value) return null;
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-base">{value}</p>
    </div>
  );
}

export function TransactionDetailsDialog({
  transaction,
  children,
}: TransactionDetailsDialogProps) {
  const [open, setOpen] = useState(false);

  const location = locations.find((l) => l.id === transaction.locationId);
  const sourceAccount = accounts.find(
    (a) => a.id === transaction.sourceAccountId
  );
  const destinationAccount = accounts.find(
    (a) => a.id === transaction.destinationAccountId
  );
  const date = new Date(transaction.date);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        asChild
      >
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalles de la Transacción</DialogTitle>
          <DialogDescription>
            ID de la transacción: {transaction.id}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DetailItem
            label="Tipo"
            value={transactionTypeMap[transaction.type] ?? transaction.type}
          />
          <DetailItem label="Descripción" value={transaction.description} />
          <DetailItem label="Monto" value={formatCurrency(transaction.amount)} />
          <DetailItem
            label="Fecha y Hora"
            value={date.toLocaleString('es-HN', {
              dateStyle: 'long',
              timeStyle: 'short',
            })}
          />
          <DetailItem label="Localidad" value={location?.name} />
          <DetailItem label="Cuenta de Origen" value={sourceAccount?.name} />
          <DetailItem
            label="Cuenta de Destino"
            value={destinationAccount?.name}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
