import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  FAB, 
  Surface,
  Text,
  useTheme,
  Chip
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const accounts = [
    { name: 'Main Account', balance: 2547.89, type: 'Checking' },
    { name: 'Savings', balance: 12500.00, type: 'Savings' },
    { name: 'Credit Card', balance: -1250.45, type: 'Credit' },
  ];

  const recentTransactions = [
    { id: 1, description: 'Grocery Store', amount: -85.50, date: 'Today' },
    { id: 2, description: 'Salary', amount: 3500.00, date: 'Yesterday' },
    { id: 3, description: 'Coffee Shop', amount: -4.50, date: 'Yesterday' },
    { id: 4, description: 'Gas Station', amount: -45.00, date: '2 days ago' },
  ];

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Balance Overview */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={[styles.balanceTitle, { color: theme.colors.primary }]}>
              Total Balance
            </Title>
            <Text style={[styles.balanceAmount, { color: theme.colors.onSurface }]}>
              ${totalBalance.toFixed(2)}
            </Text>
          </Card.Content>
        </Card>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Surface style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.statValue, { color: theme.colors.success }]}>
              $3,500
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.onSurface }]}>
              This Month Income
            </Text>
          </Surface>
          <Surface style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.statValue, { color: theme.colors.error }]}>
              $1,250
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.onSurface }]}>
              This Month Expenses
            </Text>
          </Surface>
        </View>

        {/* Accounts */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Accounts</Title>
            {accounts.map((account, index) => (
              <View key={index} style={styles.accountItem}>
                <View style={styles.accountInfo}>
                  <Text style={[styles.accountName, { color: theme.colors.onSurface }]}>
                    {account.name}
                  </Text>
                  <Chip mode="outlined" compact>
                    {account.type}
                  </Chip>
                </View>
                <Text style={[
                  styles.accountBalance, 
                  { color: account.balance >= 0 ? theme.colors.success : theme.colors.error }
                ]}>
                  ${account.balance.toFixed(2)}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Recent Transactions */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Recent Transactions</Title>
            {recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionInfo}>
                  <Text style={[styles.transactionDescription, { color: theme.colors.onSurface }]}>
                    {transaction.description}
                  </Text>
                  <Text style={[styles.transactionDate, { color: theme.colors.onSurfaceVariant }]}>
                    {transaction.date}
                  </Text>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount >= 0 ? theme.colors.success : theme.colors.error }
                ]}>
                  {transaction.amount >= 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="plus"
        onPress={() => navigation.navigate('AddTransaction')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  balanceTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  accountBalance: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;