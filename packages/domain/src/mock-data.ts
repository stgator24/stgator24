import type { Account, BudgetCategory, CashFlowSnapshot } from "./types";

export const mockBudgetCategories: BudgetCategory[] = [
  {
    id: "housing",
    name: "Housing",
    allocation: 2200,
    spent: 2055,
    description: "Mortgage, insurance, utilities",
    trend: "flat"
  },
  {
    id: "groceries",
    name: "Groceries",
    allocation: 650,
    spent: 488,
    description: "Household essentials",
    trend: "down"
  },
  {
    id: "dining",
    name: "Dining Out",
    allocation: 300,
    spent: 276,
    description: "Restaurants and cafes",
    trend: "up"
  },
  {
    id: "travel",
    name: "Travel",
    allocation: 400,
    spent: 90,
    description: "Weekend getaways",
    trend: "down"
  }
];

export const mockCashFlow: CashFlowSnapshot[] = [
  { month: "May 2025", income: 8900, expenses: 6720 },
  { month: "June 2025", income: 9100, expenses: 7015 },
  { month: "July 2025", income: 9050, expenses: 6680 }
];

export const mockAccounts: Account[] = [
  {
    id: "acc-1",
    institution: "Monarch Bank",
    type: "checking",
    balance: 4825.97,
    lastUpdated: new Date().toISOString()
  },
  {
    id: "acc-2",
    institution: "BlueSky Investments",
    type: "brokerage",
    balance: 18520.45,
    lastUpdated: new Date().toISOString()
  },
  {
    id: "acc-3",
    institution: "SkyCard Rewards",
    type: "credit",
    balance: -1240.18,
    lastUpdated: new Date().toISOString()
  }
];

export const aggregateSpend = (categories: BudgetCategory[]) => {
  return categories.reduce(
    (acc, category) => {
      acc.spent += category.spent;
      acc.allocation += category.allocation;
      return acc;
    },
    { spent: 0, allocation: 0 }
  );
};

export const calculateSavingsRate = (snapshots: CashFlowSnapshot[]) => {
  if (!snapshots.length) {
    return 0;
  }
  const { incomeTotal, expensesTotal } = snapshots.reduce(
    (acc, snapshot) => {
      acc.incomeTotal += snapshot.income;
      acc.expensesTotal += snapshot.expenses;
      return acc;
    },
    { incomeTotal: 0, expensesTotal: 0 }
  );
  const averageIncome = incomeTotal / snapshots.length;
  const averageExpenses = expensesTotal / snapshots.length;
  return averageIncome === 0 ? 0 : (averageIncome - averageExpenses) / averageIncome;
};
