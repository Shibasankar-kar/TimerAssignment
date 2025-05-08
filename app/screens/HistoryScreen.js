import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../constants/colors';
import {formatTime} from '../utility/timerUtils';
import {getTimerHistory} from '../utility/storage';
import {useFocusEffect} from '@react-navigation/native';

const HistoryScreen = ({navigation}) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, []),
  );

  const loadHistory = async () => {
    try {
      const timerHistory = await getTimerHistory();
      setHistory(timerHistory);
    } catch (error) {
      Alert.alert('Error', 'Failed to load timer history');
      console.error(error);
    }
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Timer History</Text>
        <View />
      </View>

      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Feather name="list" size={64} color={colors.primaryLight} />
          <Text style={styles.emptyStateText}>No timers history found.</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.historyItem}>
              <View style={styles.historyItemHeader}>
                <Text style={styles.historyItemName}>{item.name}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
              </View>
              <View style={styles.historyItemDetails}>
                <Text style={styles.historyItemTime}>
                  Duration: {formatTime(item.duration)}
                </Text>
                <Text style={styles.historyItemDate}>
                  Completed: {formatDate(item.completedAt)}
                </Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  clearButton: {
    padding: 8,
  },
  list: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 16,
  },
  historyItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyItemName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  categoryBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  categoryText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  historyItemDetails: {
    flexDirection: 'column',
  },
  historyItemTime: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  historyItemDate: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default HistoryScreen;
