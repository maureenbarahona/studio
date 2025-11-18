import type {Location, BankAccount, Transaction} from './types';

export const locations: Location[] = [
  {id: 'loc1', name: 'Agencia Central', cashBalance: 15000.75},
  {id: 'loc2', name: 'Sucursal Norte', cashBalance: 9850.0},
  {id: 'loc3', name: 'Punto Sur', cashBalance: 12345.5},
];

export const accounts: BankAccount[] = [
  {
    id: 'acc1',
    name: 'BAC Credomatic Lempiras',
    bankName: 'BAC Credomatic',
    accountNumber: '123-456-789',
    balance: 150000.0,
  },
  {
    id: 'acc2',
    name: 'Ficohsa Lempiras',
    bankName: 'Banco Ficohsa',
    accountNumber: '987-654-321',
    balance: 275000.5,
  },
  {
    id: 'acc3',
    name: 'Atlantida Ahorros',
    bankName: 'Banco Atlantida',
    accountNumber: '555-123-888',
    balance: 85000.25,
  },
];

export const transactions: Transaction[] = [
  {
    id: 'txn1',
    date: new Date('2024-07-22T09:00:00'),
    locationId: 'loc1',
    type: 'deposito',
    amount: 5000,
    description: 'Depósito de cliente',
    destinationAccountId: 'acc1',
  },
  {
    id: 'txn2',
    date: new Date('2024-07-22T10:30:00'),
    locationId: 'loc2',
    type: 'pago_proveedor',
    amount: 2500,
    description: 'Pago a proveedor de limpieza',
    sourceAccountId: 'acc2',
  },
  {
    id: 'txn3',
    date: new Date('2024-07-21T14:15:00'),
    locationId: 'loc1',
    type: 'retiro',
    amount: 1000,
    description: 'Retiro para caja chica',
    sourceAccountId: 'acc1',
  },
  {
    id: 'txn4',
    date: new Date('2024-07-21T16:45:00'),
    locationId: 'loc3',
    type: 'ingreso_caja',
    amount: 300,
    description: 'Venta de servicio #123',
  },
  {
    id: 'txn5',
    date: new Date('2024-07-20T11:00:00'),
    locationId: 'loc1',
    type: 'transferencia',
    amount: 10000,
    description: 'Transferencia de fondos a Ficohsa',
    sourceAccountId: 'acc1',
    destinationAccountId: 'acc2',
  },
  {
    id: 'txn6',
    date: new Date('2024-07-20T09:30:00'),
    locationId: 'loc2',
    type: 'gasto_caja',
    amount: 150.5,
    description: 'Compra de papelería',
  },
  {
    id: 'txn7',
    date: new Date('2024-07-19T15:00:00'),
    locationId: 'loc3',
    type: 'deposito',
    amount: 7500,
    description: 'Depósito de ventas del día',
    destinationAccountId: 'acc3',
  },
  {
    id: 'txn8',
    date: new Date('2024-07-18T13:00:00'),
    locationId: 'loc1',
    type: 'otro',
    amount: 550,
    description: 'Ajuste de sistema',
  },
];
