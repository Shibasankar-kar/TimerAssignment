import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../constants/colors';
import {getTimers} from '../utility/storage';
import TimerGroup from '../components/TimerGroup';
import {groupTimersByCategory} from '../utility/timerUtils';
import {useFocusEffect} from '@react-navigation/native';
import CompletionModal from '../components/CompletionModal';

const HomeScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [timerGroups, setTimerGroups] = useState([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedTimer, setCompletedTimer] = useState(null);

  useEffect(() => {
    loadTimers();
  }, []);

  const loadTimers = async () => {
    try {
      const timers = await getTimers();
      const grouped = groupTimersByCategory(timers);
      setTimerGroups(grouped);
    } catch (error) {
      Alert.alert('Error', 'Failed to load timers.');
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTimers();
    }, []),
  );

  const handleTimerCompleted = timer => {
    setCompletedTimer(timer);
    setShowCompletionModal(true);
  };

  const closeCompletionModal = () => {
    setShowCompletionModal(false);
    setCompletedTimer(null);
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <Text style={styles.title}>Timer</Text>
        <View style={styles.headerButtons} />
        {timerGroups.length !== 0 && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddTimerScreen')}>
            <Feather name="plus" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {timerGroups.length === 0 ? (
        <View style={styles.emptyState}>
          <Feather name="clock" size={64} color={colors.primaryLight} />
          <Text style={styles.emptyStateText}>No timers added yet</Text>
          <TouchableOpacity
            style={styles.emptyStateButton}
            onPress={() => navigation.navigate('AddTimerScreen')}>
            <Text style={styles.emptyStateButtonText}>
              Add Your First Timer
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={timerGroups}
          keyExtractor={item => item.category}
          renderItem={({item}) => (
            <TimerGroup
              category={item.category}
              timers={item.timers}
              onRefresh={loadTimers}
              onTimerCompleted={handleTimerCompleted}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}

      <CompletionModal
        visible={showCompletionModal}
        timer={completedTimer}
        onClose={closeCompletionModal}
      />
    </View>
  );
};

export default HomeScreen;

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 16,
  },
  addButton: {
    backgroundColor: colors.primary,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
