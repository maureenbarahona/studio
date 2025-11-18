import {Banknote, Wallet} from 'lucide-react';
import {RecentTransactions} from '@/components/dashboard/recent-transactions';
import {StatCard} from '@/components/dashboard/stat-card';
import PageHeader from '@/components/page-header';
import {accounts, locations} from '@/lib/data';
import {formatCurrency} from '@/lib/utils';
import { AccountBalanceChart } from '@/components/dashboard/account-balance-chart';

export default function DashboardPage() {
  const totalCash = locations.reduce((sum, loc) => sum + loc.cashBalance, 0);
  const totalBankFunds = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        description="Un resumen de la actividad financiera."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <StatCard
          title="Efectivo Total en Cajas"
          value={formatCurrency(totalCash)}
          icon={<Wallet className="size-6 text-primary" />}
          description="Suma de efectivo en todas las localidades"
        />
        <StatCard
          title="Fondos Totales en Bancos"
          value={formatCurrency(totalBankFunds)}
          icon={<Banknote className="size-6 text-primary" />}
          description="Suma de saldos en todas las cuentas"
        />
      </div>

      <AccountBalanceChart />
      <RecentTransactions />
    </div>
  );
}
