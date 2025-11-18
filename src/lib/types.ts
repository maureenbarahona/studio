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
  date: Date; // Fecha en que ocurrió la transacción
  locationId: string;
  type: TransactionType;
  amount: number;
  description: string;
  sourceAccountId?: string;
  destinationAccountId?: string;
  statusId: string;
  userId: string;
  createdAt: Date; // Fecha en que se registró en el sistema
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

export interface TransactionStatus {
  id: string;
  name: string;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
}
