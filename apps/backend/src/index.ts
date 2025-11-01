import cors from "cors";
import express from "express";
import { z } from "zod";
import {
  aggregateSpend,
  budgetingDashboardSchema,
  calculateSavingsRate,
  mockAccounts,
  mockBudgetCategories,
  mockCashFlow
} from "@budget/domain";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ?? "4000";

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/budgets", (_req, res) => {
  const dashboard = {
    categories: mockBudgetCategories,
    cashFlow: mockCashFlow,
    accounts: mockAccounts
  };

  const validated = budgetingDashboardSchema.safeParse(dashboard);
  if (!validated.success) {
    res.status(500).json({ message: "Failed to construct dashboard", issues: validated.error.issues });
    return;
  }

  const totals = aggregateSpend(mockBudgetCategories);
  const savingsRate = calculateSavingsRate(mockCashFlow);

  res.json({
    ...validated.data,
    totals,
    savingsRate
  });
});

app.post("/budgets", (req, res) => {
  const CategoryInput = budgetingDashboardSchema.pick({ categories: true });
  const parsed = CategoryInput.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ message: "Invalid payload", issues: parsed.error.issues });
    return;
  }

  // A real implementation would persist and enrich the data.
  const totals = aggregateSpend(parsed.data.categories);
  res.status(201).json({ categories: parsed.data.categories, totals });
});

app.get("/accounts", (_req, res) => {
  res.json({ accounts: mockAccounts });
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof z.ZodError) {
    res.status(400).json({ message: "Validation error", issues: err.issues });
    return;
  }

  console.error(err);
  res.status(500).json({ message: "Unexpected server error" });
});

app.listen(Number(PORT), () => {
  console.log(`Backend API listening on http://localhost:${PORT}`);
});
