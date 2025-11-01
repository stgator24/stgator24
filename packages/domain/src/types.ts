export type BudgetCategory = {
  id: string;
  name: string;
  allocation: number;
  spent: number;
  description?: string;
  trend?: "up" | "down" | "flat";
};

export type CashFlowSnapshot = {
  month: string;
  income: number;
  expenses: number;
};

export type Account = {
  id: string;
  institution: string;
  type: "checking" | "savings" | "brokerage" | "credit";
  balance: number;
  lastUpdated: string;
};
