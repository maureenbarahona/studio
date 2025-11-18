'use client';

import PageHeader from '@/components/page-header';
import {DataTable} from './data-table';
import {columns} from './columns';
import {transactions as initialTransactions, users, locations, accounts} from '@/lib/data';
import {NewTransactionDialog} from './new-transaction-dialog';
import {useState} from 'react';
import type {Transaction} from '@/lib/types';
import {Button} from '@/components/ui/button';
import {Calendar as CalendarIcon, FileDown} from 'lucide-react';
import {DateRange} from 'react-day-picker';
import {addDays, format, endOfDay} from 'date-fns';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Calendar} from '@/components/ui/calendar';
import {cn} from '@/lib/utils';
import {Input} from '@/components/ui/input';

const transactionTypeMap: Record<string, string> = {
  deposito: 'Depósito',
  retiro: 'Retiro',
  transferencia: 'Transferencia',
  pago_proveedor: 'Pago Proveedor',
  ingreso_caja: 'Ingreso Caja',
  gasto_caja: 'Gasto Caja',
  otro: 'Otro',
};

export default function TransaccionesPage() {
  const [data, setData] = useState<Transaction[]>(initialTransactions);
  const [filter, setFilter] = useState('');
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const addTransaction = (
    newTx: Omit<Transaction, 'id' | 'date' | 'createdAt' | 'userId'>
  ) => {
    // En una aplicación real, el ID de usuario vendría de la sesión de autenticación.
    const currentUserId = users[0].id;

    const txToAdd: Transaction = {
      ...newTx,
      id: `txn-${Date.now()}`,
      date: new Date(),
      createdAt: new Date(),
      userId: currentUserId,
    };
    setData((prev) => [txToAdd, ...prev]);
  };

  const filteredTransactions = data
    .filter((tx) => {
      if (!date?.from || !date?.to) return true;
      const fromDate = date.from;
      const toDate = endOfDay(date.to);
      const txDate = new Date(tx.date);
      return txDate >= fromDate && txDate <= toDate;
    })
    .filter((tx) =>
      tx.description.toLowerCase().includes(filter.toLowerCase())
    );

  const handleExport = () => {
    const headers = [
      'ID',
      'Fecha',
      'Localidad',
      'Tipo',
      'Monto',
      'Descripción',
      'Cuenta Origen',
      'Cuenta Destino',
    ];

    const dataToExport = filteredTransactions.map((tx) => [
      tx.id,
      format(new Date(tx.date), 'yyyy-MM-dd HH:mm:ss'),
      locations.find((l) => l.id === tx.locationId)?.name || '',
      transactionTypeMap[tx.type] || tx.type,
      tx.amount,
      `"${tx.description.replace(/"/g, '""')}"`,
      accounts.find((a) => a.id === tx.sourceAccountId)?.name || '',
      accounts.find((a) => a.id === tx.destinationAccountId)?.name || '',
    ]);

    const csvContent =
      [headers.join(','), ...dataToExport.map((row) => row.join(','))].join(
        '\n'
      );

    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'transacciones.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Transacciones"
        description="Administra todos los movimientos de dinero."
      >
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <FileDown className="mr-2" />
            Exportar
          </Button>
          <NewTransactionDialog onTransactionAdd={addTransaction} />
        </div>
      </PageHeader>

      <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center">
        <Input
          placeholder="Filtrar por descripción..."
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="max-w-sm"
        />
        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal md:w-[300px]',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Seleccione un rango</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <DataTable columns={columns} data={filteredTransactions} />
    </div>
  );
}
