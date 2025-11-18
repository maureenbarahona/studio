'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { accounts, currencies } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

export function AccountBalanceChart() {

  const chartData = accounts.map(account => {
    const currency = currencies.find(c => c.id === account.currencyId);
    return {
      ...account,
      displayName: `${account.name} (${currency?.code})`
    }
  });


  return (
    <Card>
      <CardHeader>
        <CardTitle>Saldos en Cuentas Bancarias</CardTitle>
        <CardDescription>
          Un vistazo rápido a los saldos de cada cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="displayName"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval={0}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value as number, 'HNL')}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
              }}
              formatter={(value, name, props) => {
                const currency = currencies.find(c => c.id === props.payload.currencyId);
                return formatCurrency(value as number, currency?.code)
              }}
              labelStyle={{ fontWeight: 'bold' }}
            />
            <Bar
              dataKey="balance"
              fill="hsl(var(--primary))"
              name="Saldo"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
