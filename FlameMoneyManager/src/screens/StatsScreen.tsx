import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { 
  Card, 
  Title, 
  Text, 
  useTheme,
  SegmentedButtons,
  Surface
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface StatsScreenProps {
  navigation: any;
}

const StatsScreen: React.FC<StatsScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('month');

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 32;

  // Mock data for charts
  const expenseData = [
    { name: 'Food', amount: 450, color: '#FF6B35', percentage: 30 },
    { name: 'Transport', amount: 300, color: '#F7931E', percentage: 20 },
    { name: 'Entertainment', amount: 225, color: '#FFD23F', percentage: 15 },
    { name: 'Shopping', amount: 375, color: '#38A169', percentage: 25 },
    { name: 'Others', amount: 150, color: '#3182CE', percentage: 10 },
  ];

  const monthlyData = [
    { month: 'Jan', income: 3500, expenses: 2800 },
    { month: 'Feb', income: 3500, expenses: 3200 },
    { month: 'Mar', income: 4000, expenses: 2900 },
    { month: 'Apr', income: 3500, expenses: 3100 },
    { month: 'May', income: 3800, expenses: 2700 },
    { month: 'Jun', income: 3500, expenses: 3000 },
  ];

  const SimpleBarChart = ({ data, width, height = 200 }: { data: any[], width: number, height?: number }) => {
    const maxValue = Math.max(...data.map(d => Math.max(d.income, d.expenses)));
    
    return (
      <View style={[styles.chartContainer, { width, height }]}>
        {data.map((item, index) => {
          const incomeHeight = (item.income / maxValue) * (height - 40);
          const expenseHeight = (item.expenses / maxValue) * (height - 40);
          
          return (
            <View key={index} style={styles.barContainer}>
              <View style={styles.bars}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: incomeHeight, 
                      backgroundColor: theme.colors.success,
                      marginBottom: 2
                    }
                  ]} 
                />
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: expenseHeight, 
                      backgroundColor: theme.colors.error 
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.chartLabel, { color: theme.colors.onSurfaceVariant }]}>
                {item.month}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  const SimplePieChart = ({ data, size = 200 }: { data: any[], size?: number }) => {
    let currentAngle = 0;
    
    return (
      <View style={[styles.pieChartContainer, { width: size, height: size }]}>
        {data.map((item, index) => {
          const angle = (item.percentage / 100) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;
          currentAngle += angle;
          
          return (
            <View key={index} style={styles.pieSlice}>
              <View 
                style={[
                  styles.pieColor, 
                  { backgroundColor: item.color }
                ]} 
              />
              <Text style={[styles.pieLabel, { color: theme.colors.onSurface }]}>
                {item.name} ({item.percentage}%)
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Time Range Selector */}
        <View style={styles.timeRangeContainer}>
          <SegmentedButtons
            value={timeRange}
            onValueChange={setTimeRange}
            buttons={[
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
              { value: 'year', label: 'Year' },
            ]}
            style={styles.segmentedButtons}
          />
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <Surface style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.summaryHeader}>
              <Ionicons name="trending-up" size={24} color={theme.colors.success} />
              <Text style={[styles.summaryTitle, { color: theme.colors.onSurface }]}>
                Total Income
              </Text>
            </View>
            <Text style={[styles.summaryAmount, { color: theme.colors.success }]}>
              $3,500
            </Text>
            <Text style={[styles.summaryChange, { color: theme.colors.success }]}>
              +5.2% from last month
            </Text>
          </Surface>

          <Surface style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.summaryHeader}>
              <Ionicons name="trending-down" size={24} color={theme.colors.error} />
              <Text style={[styles.summaryTitle, { color: theme.colors.onSurface }]}>
                Total Expenses
              </Text>
            </View>
            <Text style={[styles.summaryAmount, { color: theme.colors.error }]}>
              $2,800
            </Text>
            <Text style={[styles.summaryChange, { color: theme.colors.error }]}>
              +2.1% from last month
            </Text>
          </Surface>
        </View>

        {/* Income vs Expenses Chart */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Income vs Expenses</Title>
            <SimpleBarChart data={monthlyData} width={chartWidth} />
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: theme.colors.success }]} />
                <Text style={[styles.legendText, { color: theme.colors.onSurface }]}>Income</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: theme.colors.error }]} />
                <Text style={[styles.legendText, { color: theme.colors.onSurface }]}>Expenses</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Expense Categories */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Expense Categories</Title>
            <SimplePieChart data={expenseData} size={chartWidth} />
          </Card.Content>
        </Card>

        {/* Top Categories */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Top Spending Categories</Title>
            {expenseData.map((category, index) => (
              <View key={index} style={styles.categoryItem}>
                <View style={styles.categoryInfo}>
                  <View 
                    style={[
                      styles.categoryColor, 
                      { backgroundColor: category.color }
                    ]} 
                  />
                  <Text style={[styles.categoryName, { color: theme.colors.onSurface }]}>
                    {category.name}
                  </Text>
                </View>
                <View style={styles.categoryAmount}>
                  <Text style={[styles.categoryValue, { color: theme.colors.onSurface }]}>
                    ${category.amount}
                  </Text>
                  <Text style={[styles.categoryPercentage, { color: theme.colors.onSurfaceVariant }]}>
                    {category.percentage}%
                  </Text>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Financial Health Score */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Title style={{ color: theme.colors.onSurface }}>Financial Health Score</Title>
            <View style={styles.healthScoreContainer}>
              <View style={styles.scoreCircle}>
                <Text style={[styles.scoreValue, { color: theme.colors.primary }]}>
                  85
                </Text>
                <Text style={[styles.scoreLabel, { color: theme.colors.onSurfaceVariant }]}>
                  / 100
                </Text>
              </View>
              <View style={styles.scoreDetails}>
                <Text style={[styles.scoreTitle, { color: theme.colors.onSurface }]}>
                  Excellent
                </Text>
                <Text style={[styles.scoreDescription, { color: theme.colors.onSurfaceVariant }]}>
                  You're managing your finances well. Keep up the good work!
                </Text>
              </View>
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
  timeRangeContainer: {
    marginBottom: 16,
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 14,
    marginLeft: 8,
    opacity: 0.8,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryChange: {
    fontSize: 12,
    opacity: 0.7,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginVertical: 16,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bars: {
    height: 160,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    width: 20,
    borderRadius: 2,
  },
  chartLabel: {
    fontSize: 12,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
  },
  pieChartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  pieSlice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  pieColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  pieLabel: {
    fontSize: 14,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryAmount: {
    alignItems: 'flex-end',
  },
  categoryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryPercentage: {
    fontSize: 12,
    opacity: 0.7,
  },
  healthScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  scoreDetails: {
    flex: 1,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  scoreDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
});

export default StatsScreen;