export type TransactionType =
  | 'deposito'
  | 'retiro'
  | 'transferencia'
  | 'pago_proveedor'
  | 'ingreso_caja'
  | 'gasto_caja'
  | 'otro';

export interface Transaction {
  id: string;
  date: Date;
  locationId: string;
  type: TransactionType;
  amount: number;
  description: string;
  sourceAccountId?: string;
  destinationAccountId?: string;
}

export interface BankAccount {
  id: string;
  name: string;
  bankName: string;
  accountNumber: string;
  balance: number;
}

export interface Location {
  id: string;
  name: string;
  cashBalance: number;
}
