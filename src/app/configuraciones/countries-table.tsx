'use client';

import {useState} from 'react';
import type {Country} from '@/lib/config-types';
import {countries as initialCountries} from '@/lib/data';
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
import {CountryDialog} from './country-dialog';

export function CountriesTable() {
  const [countries, setCountries] = useState<Country[]>(initialCountries);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);

  const handleSaveCountry = (countryToSave: Country) => {
    const countryExists = countries.some((country) => country.id === countryToSave.id);
    if (countryExists) {
      setCountries(countries.map((country) => (country.id === countryToSave.id ? countryToSave : country)));
    } else {
      setCountries((prev) => [countryToSave, ...prev]);
    }
  };

  const handleOpenDialog = (country: Country | null = null) => {
    setEditingCountry(country);
    setIsDialogOpen(true);
  };
  
  const handleDeleteCountry = (countryId: string) => {
    setCountries(countries.filter(country => country.id !== countryId));
  }

  const columns: ColumnDef<Country>[] = [
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'code',
      header: 'Código',
    },
    {
      id: 'actions',
      cell: ({row}) => {
        const country = row.original;
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
              <DropdownMenuItem onClick={() => handleOpenDialog(country)}>Editar</DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => handleDeleteCountry(country.id)}
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button onClick={() => handleOpenDialog()}>
          <PlusCircle className="mr-2" />
          Añadir País
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={countries}
        filterColumn="name"
        filterPlaceholder="Filtrar por nombre..."
      />
      <CountryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSaveCountry={handleSaveCountry}
        country={editingCountry}
      />
    </div>
  );
}
