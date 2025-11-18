'use client';

import {useState} from 'react';
import type {User} from '@/lib/types';
import {users as initialUsers, userRoles} from '@/lib/data';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {MoreHorizontal} from 'lucide-react';
import {UserDialog} from './new-user-dialog';
import {useAuth} from '@/components/auth-provider';
import {useToast} from '@/hooks/use-toast';
import { generateRandomPassword } from '@/lib/utils';

export function UsersTable() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const {user: loggedInUser} = useAuth();
  const {toast} = useToast();

  const handleSaveUser = (userToSave: User) => {
    const userExists = users.some((user) => user.id === userToSave.id);

    if (userExists) {
      setUsers(
        users.map((user) => (user.id === userToSave.id ? userToSave : user))
      );
    } else {
      setUsers((prev) => [userToSave, ...prev]);
    }
  };

  const handleOpenDialog = (user: User | null = null) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleSendPassword = (userToSend: User) => {
    const newPassword = generateRandomPassword();
    const updatedUser = { ...userToSend, password: newPassword };

    setUsers(users.map(u => u.id === userToSend.id ? updatedUser : u));

    toast({
      title: 'Contraseña Generada y Enviada',
      description: `Una nueva contraseña para ${updatedUser.name} ha sido enviada a ${updatedUser.email}.`,
    });
  };

  const loggedInUserRole = userRoles.find(
    (role) => role.id === loggedInUser?.role
  );
  const isAdmin = loggedInUserRole?.name === 'Administrador';

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
        const roleId = row.getValue('role') as string;
        const role = userRoles.find((r) => r.id === roleId);
        const isAdminRole = role?.name.toLowerCase().includes('admin');
        return (
          <Badge variant={isAdminRole ? 'default' : 'secondary'}>
            {role?.name ?? 'N/A'}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        const roleId = row.getValue(id) as string;
        const role = userRoles.find((r) => r.id === roleId);
        return role ? role.name.toLowerCase().includes(String(value).toLowerCase()) : false;
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
      filterFn: (row, id, value) => {
        const status = row.getValue(id) as string;
        const statusText = status === 'active' ? 'activo' : 'inactivo';
        return statusText.includes(String(value).toLowerCase());
      },
    },
    {
      id: 'actions',
      cell: ({row}) => {
        const user = row.original;
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
              <DropdownMenuItem onClick={() => handleOpenDialog(user)}>
                Editar
              </DropdownMenuItem>
              {isAdmin && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleSendPassword(user)}>
                    Enviar Contraseña
                  </DropdownMenuItem>
                </>
              )}
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
          Añadir Usuario
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={users}
        filterColumn="name"
        filterPlaceholder="Filtrar por nombre..."
      />
      <UserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSaveUser={handleSaveUser}
        user={editingUser}
      />
    </div>
  );
}
