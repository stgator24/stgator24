import React from "react";

type CashFlowCardProps = {
  month: string;
  income: number;
  expenses: number;
};

export const CashFlowCard: React.FC<CashFlowCardProps> = ({ month, income, expenses }) => {
  const net = income - expenses;
  const netLabel = net >= 0 ? `+$${net.toFixed(2)}` : `-$${Math.abs(net).toFixed(2)}`;

  return (
    <section
      style={{
        borderRadius: 24,
        padding: 24,
        background: "#0f172a",
        color: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        minWidth: 280
      }}
    >
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 14, opacity: 0.7 }}>Cash Flow</span>
        <strong style={{ fontSize: 16 }}>{month}</strong>
      </header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>Income</p>
          <h3 style={{ margin: 0, fontSize: 20 }}>${income.toFixed(2)}</h3>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>Expenses</p>
          <h3 style={{ margin: 0, fontSize: 20 }}>${expenses.toFixed(2)}</h3>
        </div>
      </div>
      <footer style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, opacity: 0.7 }}>Net</span>
        <strong style={{ fontSize: 18, color: net >= 0 ? "#34d399" : "#f87171" }}>{netLabel}</strong>
      </footer>
    </section>
  );
};
