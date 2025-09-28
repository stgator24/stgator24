import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { 
  Card, 
  Title, 
  Text, 
  useTheme,
  Switch,
  List,
  Button,
  Divider,
  IconButton
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface SettingsScreenProps {
  navigation: any;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Your data will be exported to a CSV file. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => console.log('Exporting data...') }
      ]
    );
  };

  const handleImportData = () => {
    Alert.alert(
      'Import Data',
      'Select a CSV file to import your transactions.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Import', onPress: () => console.log('Importing data...') }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => console.log('Deleting account...') 
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Appearance Settings */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Appearance</Title>
            <List.Item
              title="Dark Mode"
              description="Switch between light and dark themes"
              left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => (
                <Switch
                  value={isDarkMode}
                  onValueChange={setIsDarkMode}
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Theme Color"
              description="Customize the app's primary color"
              left={(props) => <List.Icon {...props} icon="palette" />}
              right={() => <IconButton icon="chevron-right" />}
              onPress={() => console.log('Theme color settings')}
            />
          </Card.Content>
        </Card>

        {/* Security Settings */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Security</Title>
            <List.Item
              title="Biometric Authentication"
              description="Use fingerprint or face recognition"
              left={(props) => <List.Icon {...props} icon="fingerprint" />}
              right={() => (
                <Switch
                  value={biometric}
                  onValueChange={setBiometric}
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider />
            <List.Item
              title="App Lock"
              description="Lock the app when not in use"
              left={(props) => <List.Icon {...props} icon="lock" />}
              right={() => <IconButton icon="chevron-right" />}
              onPress={() => console.log('App lock settings')}
            />
            <Divider />
            <List.Item
              title="Change PIN"
              description="Update your security PIN"
              left={(props) => <List.Icon {...props} icon="key" />}
              right={() => <IconButton icon="chevron-right" />}
              onPress={() => console.log('Change PIN')}
            />
          </Card.Content>
        </Card>

        {/* Notifications */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Notifications</Title>
            <List.Item
              title="Push Notifications"
              description="Receive notifications for important updates"
              left={(props) => <List.Icon {...props} icon="bell" />}
              right={() => (
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Budget Alerts"
              description="Get notified when approaching budget limits"
              left={(props) => <List.Icon {...props} icon="alert" />}
              right={() => <IconButton icon="chevron-right" />}
              onPress={() => console.log('Budget alerts settings')}
            />
            <Divider />
            <List.Item
              title="Bill Reminders"
              description="Reminders for upcoming bills and payments"
              left={(props) => <List.Icon {...props} icon="calendar-clock" />}
              right={() => <IconButton icon="chevron-right" />}
              onPress={() => console.log('Bill reminders settings')}
            />
          </Card.Content>
        </Card>

        {/* Data Management */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Data Management</Title>
            <List.Item
              title="Auto Backup"
              description="Automatically backup your data to the cloud"
              left={(props) => <List.Icon {...props} icon="cloud-upload" />}
              right={() => (
                <Switch
                  value={autoBackup}
                  onValueChange={setAutoBackup}
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Export Data"
              description="Export your data to a CSV file"
              left={(props) => <List.Icon {...props} icon="download" />}
              right={() => <IconButton icon="chevron-right" />}
              onPress={handleExportData}
            />
            <Divider />
            <List.Item
              title="Import Data"
              description="Import transactions from a CSV file"
              left={(props) => <List.Icon {...props} icon="upload" />}
              right={() => <IconButton icon="chevron-right" />}
              onPress={handleImportData}
            />
            <Divider />
            <List.Item
              title="Bank Connections"
              description="Manage your connected bank accounts"
              left={(props) => <List.Icon {...props} icon="bank" />}
              right={() => <IconButton icon="chevron-right" />}
              onPress={() => console.log('Bank connections')}
            />
          </Card.Content>
        </Card>

        {/* Account Settings */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Account</Title>
            <List.Item
              title="Profile Settings"
              description="Update your personal information"
              left={(props) => <List.Icon {...props} icon="account" />}
              right={() => <IconButton icon="chevron-right" />}
              onPress={() => console.log('Profile settings')}
            />
            <Divider />
            <List.Item
              title="Subscription"
              description="Manage your premium subscription"
              left={(props) => <List.Icon {...props} icon="crown" />}
              right={() => <IconButton icon="chevron-right" />}
              onPress={() => console.log('Subscription settings')}
            />
            <Divider />
            <List.Item
              title="Privacy Policy"
              description="Read our privacy policy"
              left={(props) => <List.Icon {...props} icon="shield-account" />}
              right={() => <IconButton icon="chevron-right" />}
              onPress={() => console.log('Privacy policy')}
            />
            <Divider />
            <List.Item
              title="Terms of Service"
              description="Read our terms of service"
              left={(props) => <List.Icon {...props} icon="file-document" />}
              right={() => <IconButton icon="chevron-right" />}
              onPress={() => console.log('Terms of service')}
            />
          </Card.Content>
        </Card>

        {/* Support */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Support</Title>
            <List.Item
              title="Help Center"
              description="Get help and find answers"
              left={(props) => <List.Icon {...props} icon="help-circle" />}
              right={() => <IconButton icon="chevron-right" />}
              onPress={() => console.log('Help center')}
            />
            <Divider />
            <List.Item
              title="Contact Support"
              description="Get in touch with our support team"
              left={(props) => <List.Icon {...props} icon="email" />}
              right={() => <IconButton icon="chevron-right" />}
              onPress={() => console.log('Contact support')}
            />
            <Divider />
            <List.Item
              title="Rate App"
              description="Rate us on the App Store"
              left={(props) => <List.Icon {...props} icon="star" />}
              right={() => <IconButton icon="chevron-right" />}
              onPress={() => console.log('Rate app')}
            />
          </Card.Content>
        </Card>

        {/* Danger Zone */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.error }}>Danger Zone</Title>
            <Button
              mode="outlined"
              onPress={handleDeleteAccount}
              buttonColor="transparent"
              textColor={theme.colors.error}
              style={[styles.dangerButton, { borderColor: theme.colors.error }]}
            >
              Delete Account
            </Button>
          </Card.Content>
        </Card>

        {/* App Info */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>App Information</Title>
            <View style={styles.appInfo}>
              <Text style={[styles.appName, { color: theme.colors.onSurface }]}>
                Flame Money Manager
              </Text>
              <Text style={[styles.appVersion, { color: theme.colors.onSurfaceVariant }]}>
                Version 1.0.0
              </Text>
              <Text style={[styles.appDescription, { color: theme.colors.onSurfaceVariant }]}>
                A comprehensive personal finance management app
              </Text>
            </View>
          </Card.Content>
        </Card>
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
  dangerButton: {
    marginTop: 16,
    borderWidth: 1,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default SettingsScreen;