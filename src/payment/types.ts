export interface UsersPayment {
  id: number;
  payment: number;
}

export type DebtsByPayments = Record<string, DebtByPayment>;

export interface DebtByPayment {
  [key: string]: number;
}
