import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { 
  Card, 
  Title, 
  Text, 
  useTheme,
  TextInput,
  Button,
  SegmentedButtons,
  Chip,
  IconButton
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface AddTransactionScreenProps {
  navigation: any;
}

const AddTransactionScreen: React.FC<AddTransactionScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [transactionType, setTransactionType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const categories = [
    'Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 
    'Healthcare', 'Education', 'Travel', 'Other'
  ];

  const accounts = [
    'Main Checking', 'Savings Account', 'Credit Card', 'Investment Account'
  ];

  const handleSave = () => {
    if (!amount || !description || !category || !account) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Transaction Saved',
      'Your transaction has been saved successfully',
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Transaction Type */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Transaction Type</Title>
            <SegmentedButtons
              value={transactionType}
              onValueChange={setTransactionType}
              buttons={[
                { value: 'expense', label: 'Expense' },
                { value: 'income', label: 'Income' },
                { value: 'transfer', label: 'Transfer' },
              ]}
              style={styles.segmentedButtons}
            />
          </Card.Content>
        </Card>

        {/* Amount */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Amount *</Title>
            <TextInput
              mode="outlined"
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="numeric"
              left={<TextInput.Icon icon="currency-usd" />}
              style={styles.input}
            />
          </Card.Content>
        </Card>

        {/* Description */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Description *</Title>
            <TextInput
              mode="outlined"
              value={description}
              onChangeText={setDescription}
              placeholder="Enter transaction description"
              style={styles.input}
            />
          </Card.Content>
        </Card>

        {/* Category */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Category *</Title>
            <View style={styles.chipContainer}>
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  mode={category === cat ? 'flat' : 'outlined'}
                  selected={category === cat}
                  onPress={() => setCategory(cat)}
                  style={[
                    styles.chip,
                    category === cat && { backgroundColor: theme.colors.primary }
                  ]}
                  textStyle={{
                    color: category === cat ? '#fff' : theme.colors.onSurface
                  }}
                >
                  {cat}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Account */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Account *</Title>
            <View style={styles.chipContainer}>
              {accounts.map((acc) => (
                <Chip
                  key={acc}
                  mode={account === acc ? 'flat' : 'outlined'}
                  selected={account === acc}
                  onPress={() => setAccount(acc)}
                  style={[
                    styles.chip,
                    account === acc && { backgroundColor: theme.colors.primary }
                  ]}
                  textStyle={{
                    color: account === acc ? '#fff' : theme.colors.onSurface
                  }}
                >
                  {acc}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Date */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Date</Title>
            <TextInput
              mode="outlined"
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
              style={styles.input}
            />
          </Card.Content>
        </Card>

        {/* Notes */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Notes</Title>
            <TextInput
              mode="outlined"
              value={notes}
              onChangeText={setNotes}
              placeholder="Additional notes (optional)"
              multiline
              numberOfLines={3}
              style={styles.input}
            />
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={handleCancel}
            style={[styles.button, styles.cancelButton]}
            textColor={theme.colors.onSurface}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSave}
            style={[styles.button, styles.saveButton]}
            buttonColor={theme.colors.primary}
          >
            Save Transaction
          </Button>
        </View>
      </ScrollView>
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
  segmentedButtons: {
    marginTop: 8,
  },
  input: {
    marginTop: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    margin: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 32,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    borderColor: '#ccc',
  },
  saveButton: {
    // Primary color will be applied via buttonColor prop
  },
});

export default AddTransactionScreen;