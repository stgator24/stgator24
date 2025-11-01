import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
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

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000";
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function App() {
  const [state, setState] = useState<
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "ready"; data: DashboardResponse }
  >({ status: "loading" });

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/budgets`);
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const payload = (await response.json()) as DashboardResponse;
        setState({ status: "ready", data: payload });
      } catch (error) {
        setState({ status: "error", message: error instanceof Error ? error.message : "Unknown error" });
      }
    };

    load();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Aurora Budget</Text>
        <Text style={styles.subtitle}>A Monarch-inspired personal finance companion.</Text>

        {state.status === "loading" && (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.loadingText}>Syncing your budget?</Text>
          </View>
        )}

        {state.status === "error" && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>We hit a snag fetching data.</Text>
            <Text style={styles.errorSubText}>{state.message}</Text>
          </View>
        )}

        {state.status === "ready" && (
          <View style={styles.content}>
            <View style={styles.statRow}>
              <StatCard label="Spent" value={currency.format(state.data.totals.spent)} />
              <StatCard label="Budget" value={currency.format(state.data.totals.allocation)} />
              <StatCard label="Savings Rate" value={`${Math.round(state.data.savingsRate * 100)}%`} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Budget Categories</Text>
              <View style={styles.cardGrid}>
                {state.data.categories.map((category) => (
                  <View key={category.id} style={styles.categoryCard}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    {category.description && <Text style={styles.categoryDescription}>{category.description}</Text>}
                    <Text style={styles.categoryAmount}>Spent {currency.format(category.spent)}</Text>
                    <View style={styles.progressTrack}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${Math.min(100, Math.round((category.spent / category.allocation) * 100))}%`
                          }
                        ]}
                      />
                    </View>
                    <Text style={styles.categoryFooter}>Budget {currency.format(category.allocation)}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cash Flow</Text>
              <View style={styles.cardGrid}>
                {state.data.cashFlow.map((snapshot) => (
                  <View key={snapshot.month} style={styles.cashCard}>
                    <Text style={styles.cashMonth}>{snapshot.month}</Text>
                    <Text style={styles.cashLabel}>Income</Text>
                    <Text style={styles.cashValue}>{currency.format(snapshot.income)}</Text>
                    <Text style={styles.cashLabel}>Expenses</Text>
                    <Text style={styles.cashValue}>{currency.format(snapshot.expenses)}</Text>
                    <Text style={styles.cashNet}>
                      Net {currency.format(snapshot.income - snapshot.expenses)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f3f4f6"
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 32
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 16
  },
  subtitle: {
    fontSize: 14,
    color: "#475569",
    marginTop: 4,
    marginBottom: 24
  },
  loadingWrapper: {
    marginTop: 40,
    alignItems: "center",
    gap: 12
  },
  loadingText: {
    fontSize: 14,
    color: "#1d4ed8"
  },
  errorBox: {
    backgroundColor: "#fee2e2",
    borderRadius: 16,
    padding: 16,
    marginTop: 24
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#b91c1c"
  },
  errorSubText: {
    fontSize: 13,
    color: "#7f1d1d",
    marginTop: 4
  },
  content: {
    gap: 32
  },
  statRow: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap"
  },
  statCard: {
    flexGrow: 1,
    minWidth: 110,
    backgroundColor: "#e0f2fe",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20
  },
  statLabel: {
    fontSize: 12,
    color: "#1d4ed8",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 6
  },
  section: {
    gap: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0f172a"
  },
  cardGrid: {
    gap: 16
  },
  categoryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    gap: 8
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a"
  },
  categoryDescription: {
    fontSize: 13,
    color: "#475569"
  },
  categoryAmount: {
    fontSize: 14,
    color: "#111827",
    marginTop: 8
  },
  categoryFooter: {
    fontSize: 12,
    color: "#475569"
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#e2e8f0"
  },
  progressFill: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#2563eb"
  },
  cashCard: {
    backgroundColor: "#0f172a",
    borderRadius: 20,
    padding: 20,
    gap: 6
  },
  cashMonth: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e0f2fe"
  },
  cashLabel: {
    fontSize: 12,
    color: "#94a3b8",
    textTransform: "uppercase",
    marginTop: 6
  },
  cashValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f8fafc"
  },
  cashNet: {
    fontSize: 14,
    fontWeight: "500",
    color: "#34d399",
    marginTop: 12
  }
});
