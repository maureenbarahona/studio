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
import type {Transaction} from '@/lib/types';
import {formatCurrency} from '@/lib/utils';
import {useMemo} from 'react';
import {format} from 'date-fns';

interface ReportsChartProps {
  data: Transaction[];
}

const incomeTypes: Transaction['type'][] = ['deposito', 'ingreso_caja'];
const expenseTypes: Transaction['type'][] = [
  'retiro',
  'gasto_caja',
  'pago_proveedor',
];

export function ReportsChart({data}: ReportsChartProps) {
  const chartData = useMemo(() => {
    const dailyData: {[key: string]: {ingresos: number; gastos: number}} = {};

    data.forEach((tx) => {
      const day = format(tx.date, 'yyyy-MM-dd');
      if (!dailyData[day]) {
        dailyData[day] = {ingresos: 0, gastos: 0};
      }
      if (incomeTypes.includes(tx.type)) {
        dailyData[day].ingresos += tx.amount;
      } else if (expenseTypes.includes(tx.type)) {
        dailyData[day].gastos += tx.amount;
      }
    });

    return Object.entries(dailyData)
      .map(([date, values]) => ({
        date,
        ...values,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen de Ingresos vs. Gastos</CardTitle>
        <CardDescription>
          Comparación de ingresos y gastos para el período seleccionado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => format(new Date(value), 'MMM d')}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value as number)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
              }}
              formatter={(value) => formatCurrency(value as number)}
            />
            <Bar
              dataKey="ingresos"
              fill="hsl(var(--primary))"
              name="Ingresos"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="gastos"
              fill="hsl(var(--destructive))"
              name="Gastos"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
