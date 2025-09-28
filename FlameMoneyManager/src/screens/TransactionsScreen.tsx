import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { 
  Card, 
  Title, 
  Text, 
  FAB, 
  Searchbar,
  Chip,
  useTheme,
  SegmentedButtons
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface TransactionsScreenProps {
  navigation: any;
}

const TransactionsScreen: React.FC<TransactionsScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const transactions = [
    { 
      id: 1, 
      description: 'Grocery Store', 
      amount: -85.50, 
      date: '2024-01-15',
      category: 'Food',
      type: 'expense'
    },
    { 
      id: 2, 
      description: 'Salary Deposit', 
      amount: 3500.00, 
      date: '2024-01-14',
      category: 'Income',
      type: 'income'
    },
    { 
      id: 3, 
      description: 'Coffee Shop', 
      amount: -4.50, 
      date: '2024-01-14',
      category: 'Food',
      type: 'expense'
    },
    { 
      id: 4, 
      description: 'Gas Station', 
      amount: -45.00, 
      date: '2024-01-13',
      category: 'Transportation',
      type: 'expense'
    },
    { 
      id: 5, 
      description: 'Freelance Payment', 
      amount: 500.00, 
      date: '2024-01-12',
      category: 'Income',
      type: 'income'
    },
    { 
      id: 6, 
      description: 'Rent Payment', 
      amount: -1200.00, 
      date: '2024-01-10',
      category: 'Housing',
      type: 'expense'
    },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search transactions..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
        
        <SegmentedButtons
          value={filterType}
          onValueChange={setFilterType}
          buttons={[
            { value: 'all', label: 'All' },
            { value: 'income', label: 'Income' },
            { value: 'expense', label: 'Expenses' },
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id} style={[styles.transactionCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <View style={styles.transactionHeader}>
                <View style={styles.transactionInfo}>
                  <Text style={[styles.transactionDescription, { color: theme.colors.onSurface }]}>
                    {transaction.description}
                  </Text>
                  <Text style={[styles.transactionDate, { color: theme.colors.onSurfaceVariant }]}>
                    {formatDate(transaction.date)}
                  </Text>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount >= 0 ? theme.colors.success : theme.colors.error }
                ]}>
                  {transaction.amount >= 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                </Text>
              </View>
              <View style={styles.transactionFooter}>
                <Chip 
                  mode="outlined" 
                  compact
                  style={[
                    styles.categoryChip,
                    { 
                      backgroundColor: transaction.type === 'income' 
                        ? theme.colors.success + '20' 
                        : theme.colors.error + '20'
                    }
                  ]}
                >
                  {transaction.category}
                </Chip>
                <View style={styles.transactionType}>
                  <Ionicons 
                    name={transaction.type === 'income' ? 'arrow-up' : 'arrow-down'} 
                    size={16} 
                    color={transaction.type === 'income' ? theme.colors.success : theme.colors.error} 
                  />
                  <Text style={[
                    styles.typeText,
                    { color: transaction.type === 'income' ? theme.colors.success : theme.colors.error }
                  ]}>
                    {transaction.type === 'income' ? 'Income' : 'Expense'}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
        
        {filteredTransactions.length === 0 && (
          <Card style={[styles.emptyCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content style={styles.emptyContent}>
              <Ionicons name="receipt-outline" size={64} color={theme.colors.onSurfaceVariant} />
              <Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
                No transactions found
              </Text>
            </Card.Content>
          </Card>
        )}
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
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  searchbar: {
    marginBottom: 12,
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  transactionCard: {
    marginBottom: 8,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryChip: {
    marginRight: 8,
  },
  transactionType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  emptyCard: {
    marginTop: 32,
    elevation: 2,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    opacity: 0.7,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TransactionsScreen;