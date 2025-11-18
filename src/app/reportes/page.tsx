'use client';

import PageHeader from '@/components/page-header';
import {Button} from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Calendar as CalendarIcon, FileDown} from 'lucide-react';
import {DateRange} from 'react-day-picker';
import {addDays, format, endOfDay} from 'date-fns';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Calendar} from '@/components/ui/calendar';
import {cn} from '@/lib/utils';
import {accounts, locations, transactions, currencies} from '@/lib/data';
import {useState} from 'react';
import type {Transaction} from '@/lib/types';
import {ReportsChart} from './reports-chart';
import {DataTable} from '../transacciones/data-table';
import {columns} from '../transacciones/columns';

const transactionTypeMap: Record<string, string> = {
  deposito: 'Depósito',
  retiro: 'Retiro',
  transferencia: 'Transferencia',
  pago_proveedor: 'Pago Proveedor',
  ingreso_caja: 'Ingreso Caja',
  gasto_caja: 'Gasto Caja',
  otro: 'Otro',
};

export default function ReportesPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [locationId, setLocationId] = useState<string>('all');
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);

  const handleGenerateReport = () => {
    let filtered = transactions;

    if (locationId !== 'all') {
      filtered = filtered.filter((tx) => tx.locationId === locationId);
    }

    if (date?.from && date?.to) {
      const fromDate = date.from;
      const toDate = endOfDay(date.to); // Set to the end of the day
      filtered = filtered.filter(
        (tx) => new Date(tx.date) >= fromDate && new Date(tx.date) <= toDate
      );
    }

    setFilteredTransactions(filtered);
  };

  const handleExport = () => {
    const headers = [
      'ID',
      'Fecha',
      'Localidad',
      'Tipo',
      'Monto',
      'Moneda',
      'Descripción',
      'Cuenta Origen',
      'Cuenta Destino',
    ];

    const data = filteredTransactions.map((tx) => [
      tx.id,
      format(new Date(tx.date), 'yyyy-MM-dd HH:mm:ss'),
      locations.find((l) => l.id === tx.locationId)?.name || '',
      transactionTypeMap[tx.type] || tx.type,
      tx.amount,
      currencies.find((c) => c.id === tx.currencyId)?.code || '',
      `"${tx.description.replace(/"/g, '""')}"`,
      accounts.find((a) => a.id === tx.sourceAccountId)?.name || '',
      accounts.find((a) => a.id === tx.destinationAccountId)?.name || '',
    ]);

    const csvContent = [headers.join(','), ...data.map((row) => row.join(','))].join('\n');

    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'reporte_transacciones.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Reportes"
        description="Genera reportes por localidad y rango de fechas."
      >
        <Button variant="outline" onClick={handleExport}>
          <FileDown className="mr-2" />
          Exportar Reporte
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Localidad</label>
          <Select value={locationId} onValueChange={setLocationId}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Seleccione localidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las localidades</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc.id} value={loc.id}>
                  {loc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Rango de Fechas</label>
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
        <div className="flex-grow" />
        <div className="self-end">
          <Button onClick={handleGenerateReport}>Generar Reporte</Button>
        </div>
      </div>

      <ReportsChart data={filteredTransactions} />

      <div>
        <h3 className="mb-4 text-xl font-bold">Detalle de Transacciones</h3>
        <DataTable columns={columns} data={filteredTransactions} />
      </div>
    </div>
  );
}
