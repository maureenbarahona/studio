'use client';

import {useState} from 'react';
import type {User} from '@/lib/types';
import {users as initialUsers} from '@/lib/data';
import {DataTable} from '@/app/transacciones/data-table';
import {Button} from '@/components/ui/button';
import {PlusCircle} from 'lucide-react';
import type {ColumnDef} from '@tanstack/react-table';
import {Badge} from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {MoreHorizontal} from 'lucide-react';
import { NewUserDialog } from './new-user-dialog';

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'email',
    header: 'Correo Electrónico',
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({row}) => {
      const role = row.getValue('role') as string;
      return (
        <Badge variant={role === 'admin' ? 'default' : 'secondary'}>
          {role === 'admin' ? 'Administrador' : 'Agente'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({row}) => {
      const status = row.getValue('status') as string;
      return (
        <Badge variant={status === 'active' ? 'default' : 'destructive'}>
          {status === 'active' ? 'Activo' : 'Inactivo'}
        </Badge>
      );
    },
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

export function UsersTable() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    const userToAdd: User = {
      ...newUser,
      id: `user-${Date.now()}`,
    };
    setUsers((prev) => [userToAdd, ...prev]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2" />
          Añadir Usuario
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={users}
        filterColumn="name"
        filterPlaceholder="Filtrar por nombre..."
      />
      <NewUserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddUser={handleAddUser}
      />
    </div>
  );
}
