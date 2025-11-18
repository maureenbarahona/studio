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
import {Label} from '@/components/ui/label';
import {useToast} from '@/hooks/use-toast';
import type {User} from '@/lib/types';
import {Copy} from 'lucide-react';

interface PasswordDisplayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  password?: string | null;
}

export function PasswordDisplayDialog({
  open,
  onOpenChange,
  user,
  password,
}: PasswordDisplayDialogProps) {
  const {toast} = useToast();

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast({
        title: 'Copiado',
        description: 'La contraseña ha sido copiada al portapapeles.',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contraseña Generada</DialogTitle>
          <DialogDescription>
            La nueva contraseña para el usuario{' '}
            <span className="font-bold">{user?.name}</span> ha sido generada.
            Por favor, guárdela en un lugar seguro.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="password">Nueva Contraseña</Label>
          <div className="flex items-center gap-2">
            <Input id="password" type="text" readOnly value={password || ''} />
            <Button variant="outline" size="icon" onClick={handleCopy}>
              <Copy className="size-4" />
              <span className="sr-only">Copiar</span>
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
