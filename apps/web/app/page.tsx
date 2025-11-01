'use client';

import { useEffect, useMemo, useState } from "react";
import { AppShell, BudgetSummaryCard, CashFlowCard } from "@budget/ui";
import type { Account, BudgetCategory, CashFlowSnapshot } from "@budget/domain";

type DashboardResponse = {
  categories: BudgetCategory[];
  cashFlow: CashFlowSnapshot[];
  accounts: Account[];
  totals: {
    spent: number;
    allocation: number;
  };
  savingsRate: number;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type AsyncState<T> =
  | { status: "idle" | "loading" } & { data?: undefined; error?: undefined }
  | { status: "success"; data: T; error?: undefined }
  | { status: "error"; error: string; data?: undefined };

const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function DashboardPage() {
  const { state, refetch } = useDashboardData();

  const totals = state.status === "success" ? state.data.totals : undefined;
  const savingsRate = state.status === "success" ? state.data.savingsRate : undefined;

  const allocationRatio = useMemo(() => {
    if (!totals) {
      return "";
    }
    return `${Math.round((totals.spent / totals.allocation) * 100)}% of monthly allocation used`;
  }, [totals]);

  return (
    <AppShell
      title="Aurora Budget"
      subtitle="Stay on top of your household finances with real-time syncing, personalized insights, and a rich budgeting toolkit."
    >
      {state.status === "loading" && <StatusBanner message="Fetching the latest budgets?" />}
      {state.status === "error" && <ErrorBanner message={state.error} onRetry={refetch} />}

      {state.status === "success" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <section style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            <SummaryTile
              label="Total Spent"
              value={formatter.format(state.data.totals.spent)}
              sublabel={allocationRatio}
            />
            <SummaryTile
              label="Budget Allocation"
              value={formatter.format(state.data.totals.allocation)}
              sublabel="Across active categories"
            />
            <SummaryTile
              label="Savings Rate"
              value={`${Math.round((savingsRate ?? 0) * 100)}%`}
              sublabel="Three-month rolling average"
            />
          </section>

          <section style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {state.data.categories.map((category) => (
              <BudgetSummaryCard
                key={category.id}
                category={category.name}
                allocation={category.allocation}
                spent={category.spent}
                description={category.description}
                trend={category.trend}
              />
            ))}
          </section>

          <section style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {state.data.cashFlow.map((snapshot) => (
              <CashFlowCard key={snapshot.month} month={snapshot.month} income={snapshot.income} expenses={snapshot.expenses} />
            ))}
          </section>

          <AccountsPanel accounts={state.data.accounts} />
        </div>
      )}
    </AppShell>
  );
}

function useDashboardData() {
  const [state, setState] = useState<AsyncState<DashboardResponse>>({ status: "loading" });

  const fetchData = async () => {
    setState({ status: "loading" });
    try {
      const response = await fetch(`${API_BASE_URL}/budgets`);
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      const data = (await response.json()) as DashboardResponse;
      setState({ status: "success", data });
    } catch (error) {
      setState({ status: "error", error: error instanceof Error ? error.message : "Unknown error" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    state,
    refetch: fetchData
  };
}

function SummaryTile({ label, value, sublabel }: { label: string; value: string; sublabel?: string }) {
  return (
    <div
      style={{
        borderRadius: 20,
        padding: 20,
        background: "linear-gradient(135deg, #eef2ff 0%, #dbeafe 100%)",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}
    >
      <span style={{ fontSize: 13, letterSpacing: 0.5, textTransform: "uppercase", color: "#3b82f6" }}>{label}</span>
      <strong style={{ fontSize: 28 }}>{value}</strong>
      {sublabel && <span style={{ fontSize: 13, color: "#475569" }}>{sublabel}</span>}
    </div>
  );
}

function AccountsPanel({ accounts }: { accounts: Account[] }) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 24,
        boxShadow: "0 6px 16px rgba(15, 23, 42, 0.08)"
      }}
    >
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 20, marginBottom: 4 }}>Linked Accounts</h2>
          <p style={{ fontSize: 13, color: "#64748b" }}>Aggregated balances across your institutions</p>
        </div>
        <button
          type="button"
          style={{
            borderRadius: 999,
            border: "none",
            padding: "10px 16px",
            fontWeight: 600,
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            color: "#ffffff",
            cursor: "pointer"
          }}
          onClick={() => alert('Link new account flow placeholder')}
        >
          + Link account
        </button>
      </header>

      <div style={{ display: "grid", gap: 12 }}>
        {accounts.map((account) => (
          <div
            key={account.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 20px",
              borderRadius: 16,
              background: "#f1f5f9"
            }}
          >
            <div>
              <strong style={{ display: "block", fontSize: 16 }}>{account.institution}</strong>
              <span style={{ fontSize: 13, color: "#475569" }}>{account.type.toUpperCase()}</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <strong style={{ fontSize: 18 }}>{formatter.format(account.balance)}</strong>
              <span style={{ display: "block", fontSize: 12, color: "#64748b" }}>
                Updated {new Date(account.lastUpdated).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatusBanner({ message }: { message: string }) {
  return (
    <div
      style={{
        backgroundColor: "#dbeafe",
        color: "#1d4ed8",
        padding: "12px 16px",
        borderRadius: 12,
        fontSize: 14
      }}
    >
      {message}
    </div>
  );
}

function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div
      style={{
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
        padding: "12px 16px",
        borderRadius: 12,
        fontSize: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16
      }}
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={onRetry}
        style={{
          borderRadius: 999,
          border: "none",
          padding: "8px 16px",
          backgroundColor: "#b91c1c",
          color: "#ffffff",
          cursor: "pointer"
        }}
      >
        Retry
      </button>
    </div>
  );
}
