'use client';

import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type {BankAccount, Location} from '@/lib/types';
import {zodResolver} from '@hookform/resolvers/zod';
import {PlusCircle} from 'lucide-react';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {useToast} from '@/hooks/use-toast';
import { currencies } from '@/lib/data';

const formSchema = z.object({
  type: z.enum(['location', 'account']),
  name: z.string().min(3, 'El nombre es muy corto.'),
  initialBalance: z.coerce
    .number()
    .min(0, 'El saldo no puede ser negativo.'),
  currencyId: z.string().min(1, "Debe seleccionar una moneda."),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface NewAccountDialogProps {
  onAdd: (
    item:
      | Omit<Location, 'id' | 'cashBalance' | 'currencyId'>
      | Omit<BankAccount, 'id' | 'balance' | 'currencyId'>,
    type: 'location' | 'account',
    initialBalance: number,
    currencyId: string,
  ) => void;
}

export function NewAccountDialog({onAdd}: NewAccountDialogProps) {
  const [open, setOpen] = useState(false);
  const {toast} = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      initialBalance: 0,
      bankName: '',
      accountNumber: '',
      currencyId: currencies[0]?.id || '',
    },
  });

  const type = form.watch('type');

  function onSubmit(data: FormValues) {
    const {type, name, initialBalance, bankName, accountNumber, currencyId} = data;
    if (type === 'location') {
      onAdd({name}, 'location', initialBalance, currencyId);
    } else {
      onAdd(
        {
          name,
          bankName: bankName || '',
          accountNumber: accountNumber || '',
        },
        'account',
        initialBalance,
        currencyId,
      );
    }

    toast({
      title: `${type === 'location' ? 'Localidad' : 'Cuenta'} Creada`,
      description: `Se ha añadido con éxito.`,
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2" />
          Añadir Nuevo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Añadir Nueva Cuenta o Localidad</DialogTitle>
          <DialogDescription>
            Complete los campos para añadir un nuevo elemento.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un tipo..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="location">Localidad</SelectItem>
                      <SelectItem value="account">Cuenta Bancaria</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {type && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            type === 'location'
                              ? 'Nombre de la localidad...'
                              : 'Nombre de la cuenta...'
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="initialBalance"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Saldo Inicial</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currencyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Moneda</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione moneda..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencies.map(c => (
                            <SelectItem key={c.id} value={c.id}>{c.name} ({c.code})</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {type === 'account' && (
                  <>
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Nombre del Banco</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej. BAC Credomatic" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Número de Cuenta</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej. 123-456-789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </>
            )}

            <DialogFooter>
              <Button type="submit" disabled={!type}>
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
