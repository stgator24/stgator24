import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { 
  Card, 
  Title, 
  Text, 
  FAB, 
  useTheme,
  Chip,
  Surface
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface AccountsScreenProps {
  navigation: any;
}

const AccountsScreen: React.FC<AccountsScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const accounts = [
    { 
      id: 1,
      name: 'Main Checking', 
      balance: 2547.89, 
      type: 'Checking',
      bank: 'Emirates NBD',
      accountNumber: '****1234'
    },
    { 
      id: 2,
      name: 'Savings Account', 
      balance: 12500.00, 
      type: 'Savings',
      bank: 'ADCB',
      accountNumber: '****5678'
    },
    { 
      id: 3,
      name: 'Credit Card', 
      balance: -1250.45, 
      type: 'Credit',
      bank: 'Emirates NBD',
      accountNumber: '****9012'
    },
    { 
      id: 4,
      name: 'Investment Account', 
      balance: 8750.30, 
      type: 'Investment',
      bank: 'Banque Populaire',
      accountNumber: '****3456'
    },
  ];

  const totalAssets = accounts
    .filter(account => account.type !== 'Credit')
    .reduce((sum, account) => sum + account.balance, 0);
  
  const totalLiabilities = accounts
    .filter(account => account.type === 'Credit')
    .reduce((sum, account) => sum + Math.abs(account.balance), 0);
  
  const netWorth = totalAssets - totalLiabilities;

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'Checking':
        return 'card-outline';
      case 'Savings':
        return 'wallet-outline';
      case 'Credit':
        return 'credit-card-outline';
      case 'Investment':
        return 'trending-up-outline';
      default:
        return 'wallet-outline';
    }
  };

  const getAccountColor = (type: string) => {
    switch (type) {
      case 'Checking':
        return theme.colors.primary;
      case 'Savings':
        return theme.colors.success;
      case 'Credit':
        return theme.colors.error;
      case 'Investment':
        return theme.colors.info;
      default:
        return theme.colors.onSurfaceVariant;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Net Worth Summary */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={[styles.netWorthTitle, { color: theme.colors.primary }]}>
              Net Worth
            </Title>
            <Text style={[styles.netWorthAmount, { color: theme.colors.onSurface }]}>
              ${netWorth.toFixed(2)}
            </Text>
            <View style={styles.netWorthBreakdown}>
              <Surface style={[styles.breakdownItem, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.breakdownLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Assets
                </Text>
                <Text style={[styles.breakdownValue, { color: theme.colors.success }]}>
                  ${totalAssets.toFixed(2)}
                </Text>
              </Surface>
              <Surface style={[styles.breakdownItem, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.breakdownLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Liabilities
                </Text>
                <Text style={[styles.breakdownValue, { color: theme.colors.error }]}>
                  ${totalLiabilities.toFixed(2)}
                </Text>
              </Surface>
            </View>
          </Card.Content>
        </Card>

        {/* Accounts List */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>All Accounts</Title>
            {accounts.map((account) => (
              <View key={account.id} style={styles.accountItem}>
                <View style={styles.accountHeader}>
                  <View style={styles.accountInfo}>
                    <View style={styles.accountIconContainer}>
                      <Ionicons 
                        name={getAccountIcon(account.type) as any} 
                        size={24} 
                        color={getAccountColor(account.type)} 
                      />
                    </View>
                    <View style={styles.accountDetails}>
                      <Text style={[styles.accountName, { color: theme.colors.onSurface }]}>
                        {account.name}
                      </Text>
                      <Text style={[styles.accountBank, { color: theme.colors.onSurfaceVariant }]}>
                        {account.bank} • {account.accountNumber}
                      </Text>
                    </View>
                  </View>
                  <Text style={[
                    styles.accountBalance,
                    { color: account.balance >= 0 ? theme.colors.success : theme.colors.error }
                  ]}>
                    ${account.balance.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.accountFooter}>
                  <Chip 
                    mode="outlined" 
                    compact
                    style={[
                      styles.typeChip,
                      { borderColor: getAccountColor(account.type) }
                    ]}
                    textStyle={{ color: getAccountColor(account.type) }}
                  >
                    {account.type}
                  </Chip>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Account Groups */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Account Groups</Title>
            <View style={styles.groupItem}>
              <View style={styles.groupInfo}>
                <Text style={[styles.groupName, { color: theme.colors.onSurface }]}>
                  Banking Accounts
                </Text>
                <Text style={[styles.groupDescription, { color: theme.colors.onSurfaceVariant }]}>
                  Checking and Savings
                </Text>
              </View>
              <Text style={[styles.groupBalance, { color: theme.colors.onSurface }]}>
                $15,047.89
              </Text>
            </View>
            <View style={styles.groupItem}>
              <View style={styles.groupInfo}>
                <Text style={[styles.groupName, { color: theme.colors.onSurface }]}>
                  Credit Accounts
                </Text>
                <Text style={[styles.groupDescription, { color: theme.colors.onSurfaceVariant }]}>
                  Credit Cards and Loans
                </Text>
              </View>
              <Text style={[styles.groupBalance, { color: theme.colors.error }]}>
                -$1,250.45
              </Text>
            </View>
            <View style={styles.groupItem}>
              <View style={styles.groupInfo}>
                <Text style={[styles.groupName, { color: theme.colors.onSurface }]}>
                  Investment Accounts
                </Text>
                <Text style={[styles.groupDescription, { color: theme.colors.onSurfaceVariant }]}>
                  Stocks and Bonds
                </Text>
              </View>
              <Text style={[styles.groupBalance, { color: theme.colors.success }]}>
                $8,750.30
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="plus"
        onPress={() => {/* Add account functionality */}}
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
  netWorthTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  netWorthAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  netWorthBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  breakdownItem: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accountIconContainer: {
    marginRight: 12,
  },
  accountDetails: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  accountBank: {
    fontSize: 12,
    opacity: 0.7,
  },
  accountBalance: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  accountFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  typeChip: {
    marginRight: 8,
  },
  groupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  groupDescription: {
    fontSize: 12,
    opacity: 0.7,
  },
  groupBalance: {
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

export default AccountsScreen;