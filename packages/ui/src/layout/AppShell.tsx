import React, { PropsWithChildren } from "react";

type AppShellProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
}>;

export const AppShell: React.FC<AppShellProps> = ({ title = "Budgeting", subtitle, children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        color: "#0f172a",
        padding: "40px 32px"
      }}
    >
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700 }}>{title}</h1>
        {subtitle && <p style={{ marginTop: 8, color: "#4b5563", maxWidth: 540 }}>{subtitle}</p>}
      </header>
      <main style={{ display: "flex", flexDirection: "column", gap: 24 }}>{children}</main>
    </div>
  );
};
