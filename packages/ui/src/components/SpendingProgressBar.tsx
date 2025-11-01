import React from "react";

type SpendingProgressBarProps = {
  progress: number;
};

export const SpendingProgressBar: React.FC<SpendingProgressBarProps> = ({ progress }) => {
  const normalized = Number.isFinite(progress) ? Math.max(0, Math.min(progress, 1)) : 0;
  const percentage = Math.round(normalized * 100);

  return (
    <div
      style={{
        backgroundColor: "#e8edf7",
        borderRadius: 999,
        height: 12,
        overflow: "hidden"
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          background: "linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)",
          height: "100%"
        }}
      />
    </div>
  );
};
