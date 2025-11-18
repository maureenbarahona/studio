'use client';

import PageHeader from '@/components/page-header';
import {DataTable} from './data-table';
import {columns} from './columns';
import {transactions} from '@/lib/data';
import {NewTransactionDialog} from './new-transaction-dialog';
import {useState} from 'react';
import type {Transaction} from '@/lib/types';
import {Button} from '@/components/ui/button';
import {FileDown, PlusCircle} from 'lucide-react';

export default function TransaccionesPage() {
  const [data, setData] = useState<Transaction[]>(transactions);

  const addTransaction = (newTx: Omit<Transaction, 'id' | 'date'>) => {
    const txToAdd: Transaction = {
      ...newTx,
      id: `txn-${Date.now()}`,
      date: new Date(),
    };
    setData((prev) => [txToAdd, ...prev]);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Transacciones"
        description="Administra todos los movimientos de dinero."
      >
        <div className="flex gap-2">
          <Button variant="outline">
            <FileDown className="mr-2" />
            Exportar
          </Button>
          <NewTransactionDialog onTransactionAdd={addTransaction} />
        </div>
      </PageHeader>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
