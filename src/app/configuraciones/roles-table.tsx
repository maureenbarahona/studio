'use client';

import {useState} from 'react';
import type {UserRole} from '@/lib/types';
import {userRoles as initialRoles} from '@/lib/data';
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
import {RoleDialog} from './new-role-dialog';

export function RolesTable() {
  const [roles, setRoles] = useState<UserRole[]>(initialRoles);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<UserRole | null>(null);

  const handleSaveRole = (roleToSave: UserRole) => {
    const roleExists = roles.some((role) => role.id === roleToSave.id);
    if (roleExists) {
      setRoles(roles.map((role) => (role.id === roleToSave.id ? roleToSave : role)));
    } else {
      setRoles((prev) => [roleToSave, ...prev]);
    }
  };

  const handleOpenDialog = (role: UserRole | null = null) => {
    setEditingRole(role);
    setIsDialogOpen(true);
  };
  
  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId));
  }

  const columns: ColumnDef<UserRole>[] = [
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
        const role = row.original;
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
              <DropdownMenuItem onClick={() => handleOpenDialog(role)}>Editar</DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => handleDeleteRole(role.id)}
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
          Añadir Rol
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={roles}
        filterColumn="name"
        filterPlaceholder="Filtrar por nombre..."
      />
      <RoleDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSaveRole={handleSaveRole}
        role={editingRole}
      />
    </div>
  );
}
