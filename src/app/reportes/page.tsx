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
import {addDays, format} from 'date-fns';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Calendar} from '@/components/ui/calendar';
import {cn} from '@/lib/utils';
import {locations, transactions} from '@/lib/data';
import {useState} from 'react';
import type {Transaction} from '@/lib/types';
import {ReportsChart} from './reports-chart';
import {DataTable} from '../transacciones/data-table';
import {columns} from '../transacciones/columns';

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
      filtered = filtered.filter(
        (tx) => tx.date >= date.from! && tx.date <= date.to!
      );
    }

    setFilteredTransactions(filtered);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Reportes"
        description="Genera reportes por localidad y rango de fechas."
      >
        <Button variant="outline">
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
