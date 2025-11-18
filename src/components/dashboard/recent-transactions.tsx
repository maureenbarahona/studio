import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';
import {transactions, currencies} from '@/lib/data';
import {formatCurrency} from '@/lib/utils';

const transactionTypeMap: Record<string, string> = {
  deposito: 'Depósito',
  retiro: 'Retiro',
  transferencia: 'Transferencia',
  pago_proveedor: 'Pago Proveedor',
  ingreso_caja: 'Ingreso',
  gasto_caja: 'Gasto',
  otro: 'Otro',
};

const transactionVariantMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    deposito: 'default',
    ingreso_caja: 'default',
    retiro: 'destructive',
    gasto_caja: 'destructive',
    transferencia: 'secondary',
    pago_proveedor: 'outline',
    otro: 'secondary',
}

export function RecentTransactions() {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transacciones Recientes</CardTitle>
        <CardDescription>
          Las últimas 5 transacciones registradas en el sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descripción</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Monto</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((tx) => {
              const currency = currencies.find(c => c.id === tx.currencyId);
              return (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{tx.description}</TableCell>
                <TableCell>
                  <Badge variant={transactionVariantMap[tx.type]}>
                    {transactionTypeMap[tx.type]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{formatCurrency(tx.amount, currency?.code)}</TableCell>
                <TableCell>{tx.date.toLocaleDateString('es-HN')}</TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
