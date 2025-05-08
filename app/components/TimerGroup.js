import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../constants/colors';
import TimerItem from './TimerItem';
import CategoryActions from './CategoryActions';

const TimerGroup = ({category, timers, onRefresh, onTimerCompleted}) => {
  const [expanded, setExpanded] = useState(true);
  const [showCategoryActions, setShowCategoryActions] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
    Animated.timing(rotateAnim, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const toggleCategoryActions = () => {
    setShowCategoryActions(!showCategoryActions);
  };

  const hasActiveTimers = timers.some(timer => timer.status === 'Running');

  return (
    <View style={styles.container}>
      <View style={[styles.header, expanded && {borderBottomWidth: 1}]}>
        <TouchableOpacity style={styles.headerLeft} onPress={toggleExpanded}>
          {expanded ? (
            <Feather name="chevron-down" size={20} color={colors.primary} />
          ) : (
            <Feather name="chevron-up" size={20} color={colors.primary} />
          )}
          <Text style={styles.categoryTitle}>{category}</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{timers.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionsButton}
          onPress={toggleCategoryActions}>
          <Feather
            name="more-vertical"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {expanded && (
        <View style={styles.timersList}>
          {timers.map(timer => (
            <TimerItem
              key={timer.id}
              timer={timer}
              onRefresh={onRefresh}
              onTimerCompleted={onTimerCompleted}
            />
          ))}
        </View>
      )}

      <CategoryActions
        visible={showCategoryActions}
        category={category}
        hasActiveTimers={hasActiveTimers}
        onClose={() => setShowCategoryActions(false)}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    color: colors.text,
  },
  countBadge: {
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  countText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  actionsButton: {
    padding: 8,
  },
  timersList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default TimerGroup;
