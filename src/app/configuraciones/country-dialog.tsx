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
import type {Country} from '@/lib/config-types';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {useToast} from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  code: z.string().length(2, 'El código debe tener 2 caracteres.').toUpperCase(),
});

type FormValues = z.infer<typeof formSchema>;

interface CountryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveCountry: (country: Country) => void;
  country?: Country | null;
}

export function CountryDialog({
  open,
  onOpenChange,
  onSaveCountry,
  country,
}: CountryDialogProps) {
  const {toast} = useToast();
  const isEditMode = !!country;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (country && open) {
      form.reset(country);
    } else if (!country && open) {
      form.reset({
        name: '',
        code: '',
      });
    }
  }, [country, open, form]);

  function onSubmit(data: FormValues) {
    const countryToSave: Country = {
      ...data,
      id: country?.id || `country-${Date.now()}`,
    };
    onSaveCountry(countryToSave);

    toast({
      title: isEditMode ? 'País Actualizado' : 'País Creado',
      description: `El país ${data.name} ha sido guardado con éxito.`,
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
            {isEditMode ? 'Editar País' : 'Añadir Nuevo País'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Modifique los campos para actualizar el país.'
              : 'Complete los campos para crear un nuevo país.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Nombre del País</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Honduras" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Código (ISO 3166-1 alpha-2)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. HN" {...field} />
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
              <Button type="submit">Guardar País</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
