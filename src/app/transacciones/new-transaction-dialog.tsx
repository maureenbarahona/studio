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
import {Textarea} from '@/components/ui/textarea';
import {accounts, locations, transactionStatuses} from '@/lib/data';
import type {Transaction} from '@/lib/types';
import {zodResolver} from '@hookform/resolvers/zod';
import {PlusCircle} from 'lucide-react';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {useToast} from '@/hooks/use-toast';

const transactionSchema = z
  .object({
    type: z.enum([
      'deposito',
      'retiro',
      'transferencia',
      'pago_proveedor',
      'ingreso_caja',
      'gasto_caja',
      'otro',
    ]),
    amount: z.coerce.number().positive('El monto debe ser positivo.'),
    locationId: z.string().min(1, 'Debe seleccionar una localidad.'),
    description: z.string().min(3, 'La descripción es muy corta.'),
    sourceAccountId: z.string().optional(),
    destinationAccountId: z.string().optional(),
    statusId: z.string().min(1, 'Debe seleccionar un estado.'),
  })
  .refine(
    (data) => {
      if (['retiro', 'transferencia', 'pago_proveedor'].includes(data.type)) {
        return !!data.sourceAccountId;
      }
      return true;
    },
    {message: 'Debe seleccionar una cuenta de origen.', path: ['sourceAccountId']}
  )
  .refine(
    (data) => {
      if (['deposito', 'transferencia'].includes(data.type)) {
        return !!data.destinationAccountId;
      }
      return true;
    },
    {
      message: 'Debe seleccionar una cuenta de destino.',
      path: ['destinationAccountId'],
    }
  );

type TransactionFormValues = z.infer<typeof transactionSchema>;

interface NewTransactionDialogProps {
  onTransactionAdd: (transaction: Omit<Transaction, 'id' | 'date' | 'createdAt' | 'userId'>) => void;
}

export function NewTransactionDialog({
  onTransactionAdd,
}: NewTransactionDialogProps) {
  const [open, setOpen] = useState(false);
  const {toast} = useToast();

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      description: '',
      statusId: transactionStatuses.find(s => s.name === 'Completada')?.id || '',
    },
  });

  const transactionType = form.watch('type');

  function onSubmit(data: TransactionFormValues) {
    onTransactionAdd(data);
    toast({
      title: 'Transacción Creada',
      description: 'La nueva transacción ha sido registrada con éxito.',
    });
    setOpen(false);
    form.reset();
  }

  const showSourceAccount = [
    'retiro',
    'transferencia',
    'pago_proveedor',
  ].includes(transactionType);
  const showDestinationAccount = ['deposito', 'transferencia'].includes(
    transactionType
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2" />
          Nueva Transacción
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Registrar Nueva Transacción</DialogTitle>
          <DialogDescription>
            Complete los campos para registrar un nuevo movimiento.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Tipo de Transacción</FormLabel>
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
                      <SelectItem value="ingreso_caja">Ingreso a Caja</SelectItem>
                      <SelectItem value="gasto_caja">Gasto de Caja</SelectItem>
                      <SelectItem value="deposito">Depósito Bancario</SelectItem>
                      <SelectItem value="retiro">Retiro Bancario</SelectItem>
                      <SelectItem value="transferencia">Transferencia</SelectItem>
                      <SelectItem value="pago_proveedor">Pago a Proveedor</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Monto (L)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Localidad</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una localidad..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc.id} value={loc.id}>
                          {loc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {showSourceAccount && (
              <FormField
                control={form.control}
                name="sourceAccountId"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Cuenta de Origen</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione cuenta..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accounts.map((acc) => (
                          <SelectItem key={acc.id} value={acc.id}>
                            {acc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {showDestinationAccount && (
              <FormField
                control={form.control}
                name="destinationAccountId"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Cuenta de Destino</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione cuenta..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accounts.map((acc) => (
                          <SelectItem key={acc.id} value={acc.id}>
                            {acc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
             <FormField
              control={form.control}
              name="statusId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un estado..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {transactionStatuses.map((status) => (
                        <SelectItem key={status.id} value={status.id}>
                          {status.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Guardar Transacción</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
