'use client';

import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import type {UserRole} from '@/lib/types';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {useToast} from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveRole: (role: UserRole) => void;
  role?: UserRole | null;
}

export function RoleDialog({
  open,
  onOpenChange,
  onSaveRole,
  role,
}: RoleDialogProps) {
  const {toast} = useToast();
  const isEditMode = !!role;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (role && open) {
      form.reset(role);
    } else if (!role && open) {
      form.reset({
        name: '',
        description: '',
      });
    }
  }, [role, open, form]);

  function onSubmit(data: FormValues) {
    const roleToSave: UserRole = {
      ...data,
      id: role?.id || `role-${Date.now()}`,
    };
    onSaveRole(roleToSave);

    toast({
      title: isEditMode ? 'Rol Actualizado' : 'Rol Creado',
      description: `El rol ${data.name} ha sido guardado con éxito.`,
    });
    onOpenChange(false);
  }

  const handleDialogChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar Rol' : 'Añadir Nuevo Rol'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Modifique los campos para actualizar el rol.'
              : 'Complete los campos para crear un nuevo rol.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Nombre del Rol</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Super Admin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe el propósito de este rol..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDialogChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar Rol</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
