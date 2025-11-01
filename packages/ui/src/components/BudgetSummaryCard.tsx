import React from "react";
import { SpendingProgressBar } from "./SpendingProgressBar";

type BudgetSummaryCardProps = {
  category: string;
  spent: number;
  allocation: number;
  trend?: "up" | "down" | "flat";
  description?: string;
};

const trendEmojiMap: Record<NonNullable<BudgetSummaryCardProps["trend"]>, string> = {
  up: "??",
  down: "??",
  flat: "?"
};

export const BudgetSummaryCard: React.FC<BudgetSummaryCardProps> = ({
  category,
  spent,
  allocation,
  trend = "flat",
  description
}) => {
  const progress = Math.min(spent / allocation, 1);
  const remainder = allocation - spent;
  const remainderLabel = remainder >= 0 ? "$" + remainder.toFixed(2) + " left" : "$" + Math.abs(remainder).toFixed(2) + " over";

  return (
    <div
      style={{
        borderRadius: 16,
        padding: 20,
        background: "linear-gradient(135deg, #ffffff 0%, #f2f6ff 100%)",
        boxShadow: "0 12px 24px rgba(18, 37, 77, 0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        minWidth: 260
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#14213d" }}>{category}</h3>
          {description && (
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#5c6c8c" }}>{description}</p>
          )}
        </div>
        <span style={{ fontSize: 24 }}>{trendEmojiMap[trend]}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#1f2a44" }}>
        <span>Spent ${spent.toFixed(2)}</span>
        <span>Budget ${allocation.toFixed(2)}</span>
      </div>

      <SpendingProgressBar progress={progress} />

      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: remainder >= 0 ? "#12753a" : "#a83232"
        }}
      >
        {remainderLabel}
      </div>
    </div>
  );
};
