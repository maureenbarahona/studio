import type {
  Location,
  BankAccount,
  Transaction,
  User,
  TransactionStatus,
} from './types';

export const users: User[] = [
  {id: 'user1', name: 'Yaneth Garcia', email: 'admin@comercialyaneth.com', role: 'admin', status: 'active'},
  {id: 'user2', name: 'Agente Norte', email: 'agente.norte@comercialyaneth.com', role: 'agent', status: 'active'},
];

export const transactionStatuses: TransactionStatus[] = [
  {id: 'status1', name: 'Completada', description: 'La transacción fue procesada con éxito.'},
  {id: 'status2', name: 'Pendiente', description: 'La transacción está esperando aprobación o procesamiento.'},
  {id: 'status3', name: 'Anulada', description: 'La transacción ha sido cancelada.'},
];


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
    createdAt: new Date('2024-07-22T09:01:00'),
    locationId: 'loc1',
    type: 'deposito',
    amount: 5000,
    description: 'Depósito de cliente',
    destinationAccountId: 'acc1',
    userId: 'user1',
    statusId: 'status1',
  },
  {
    id: 'txn2',
    date: new Date('2024-07-22T10:30:00'),
    createdAt: new Date('2024-07-22T10:31:00'),
    locationId: 'loc2',
    type: 'pago_proveedor',
    amount: 2500,
    description: 'Pago a proveedor de limpieza',
    sourceAccountId: 'acc2',
    userId: 'user2',
    statusId: 'status1',
  },
  {
    id: 'txn3',
    date: new Date('2024-07-21T14:15:00'),
    createdAt: new Date('2024-07-21T14:16:00'),
    locationId: 'loc1',
    type: 'retiro',
    amount: 1000,
    description: 'Retiro para caja chica',
    sourceAccountId: 'acc1',
    userId: 'user1',
    statusId: 'status1',
  },
  {
    id: 'txn4',
    date: new Date('2024-07-21T16:45:00'),
    createdAt: new Date('2024-07-21T16:46:00'),
    locationId: 'loc3',
    type: 'ingreso_caja',
    amount: 300,
    description: 'Venta de servicio #123',
    userId: 'user1',
    statusId: 'status1',
  },
  {
    id: 'txn5',
    date: new Date('2024-07-20T11:00:00'),
    createdAt: new Date('2024-07-20T11:01:00'),
    locationId: 'loc1',
    type: 'transferencia',
    amount: 10000,
    description: 'Transferencia de fondos a Ficohsa',
    sourceAccountId: 'acc1',
    destinationAccountId: 'acc2',
    userId: 'user1',
    statusId: 'status2',
  },
  {
    id: 'txn6',
    date: new Date('2024-07-20T09:30:00'),
    createdAt: new Date('2024-07-20T09:31:00'),
    locationId: 'loc2',
    type: 'gasto_caja',
    amount: 150.5,
    description: 'Compra de papelería',
    userId: 'user2',
    statusId: 'status1',
  },
  {
    id: 'txn7',
    date: new Date('2024-07-19T15:00:00'),
    createdAt: new Date('2024-07-19T15:01:00'),
    locationId: 'loc3',
    type: 'deposito',
    amount: 7500,
    description: 'Depósito de ventas del día',
    destinationAccountId: 'acc3',
    userId: 'user1',
    statusId: 'status3',
  },
  {
    id: 'txn8',
    date: new Date('2024-07-18T13:00:00'),
    createdAt: new Date('2024-07-18T13:01:00'),
    locationId: 'loc1',
    type: 'otro',
    amount: 550,
    description: 'Ajuste de sistema',
    userId: 'user1',
    statusId: 'status1',
  },
];
