'use client';

import PageHeader from '@/components/page-header';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {accounts, locations} from '@/lib/data';
import {formatCurrency} from '@/lib/utils';
import {Banknote, Building, MoreVertical, PlusCircle} from 'lucide-react';

export default function CuentasPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Cuentas y Localidades"
        description="Administra tus cuentas bancarias y localidades de agentes."
      >
        <Button>
          <PlusCircle className="mr-2" />
          Añadir Nuevo
        </Button>
      </PageHeader>

      <Tabs defaultValue="localidades">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="localidades">Localidades</TabsTrigger>
          <TabsTrigger value="cuentas">Cuentas Bancarias</TabsTrigger>
        </TabsList>
        <TabsContent value="localidades">
          <div className="grid gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc) => (
              <Card key={loc.id}>
                <CardHeader className="flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Building className="size-8 text-primary" />
                    <CardTitle className="text-lg">{loc.name}</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="size-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Efectivo en Caja</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(loc.cashBalance)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="cuentas">
          <div className="grid gap-6 pt-4 md:grid-cols-1 lg:grid-cols-2">
            {accounts.map((acc) => (
              <Card key={acc.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Banknote className="size-8 text-primary" />
                      <div>
                        <CardTitle>{acc.name}</CardTitle>
                        <CardDescription>
                          {acc.bankName} - {acc.accountNumber}
                        </CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="size-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Saldo Actual</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(acc.balance)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
