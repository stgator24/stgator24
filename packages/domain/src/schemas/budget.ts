import { z } from "zod";

export const budgetCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  allocation: z.number().nonnegative(),
  spent: z.number().nonnegative(),
  description: z.string().optional(),
  trend: z.enum(["up", "down", "flat"]).optional()
});

export const cashFlowSnapshotSchema = z.object({
  month: z.string(),
  income: z.number(),
  expenses: z.number()
});

export const accountSchema = z.object({
  id: z.string(),
  institution: z.string(),
  type: z.enum(["checking", "savings", "brokerage", "credit"]),
  balance: z.number(),
  lastUpdated: z.string()
});

export const budgetingDashboardSchema = z.object({
  categories: z.array(budgetCategorySchema),
  cashFlow: z.array(cashFlowSnapshotSchema),
  accounts: z.array(accountSchema)
});

export type BudgetingDashboard = z.infer<typeof budgetingDashboardSchema>;
