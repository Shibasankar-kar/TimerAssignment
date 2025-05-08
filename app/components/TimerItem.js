import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {updateTimer, saveTimerToHistory} from '../utility/storage';
import {formatTime} from '../utility/timerUtils';
import colors from '../constants/colors';
import ProgressBar from './ProgressBar';

const TimerItem = ({timer, onRefresh, onTimerCompleted}) => {
  const [currentTimer, setCurrentTimer] = useState(timer);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setCurrentTimer(timer);
    if (timer.status === 'Running' && !intervalRef.current) {
      startInterval();
    } else if (timer.status !== 'Running' && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [timer]);

  const startInterval = () => {
    intervalRef.current = setInterval(async () => {
      setCurrentTimer(prevTimer => {
        if (prevTimer.remainingTime <= 0 || prevTimer.status !== 'Running') {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return prevTimer;
        }

        const newRemainingTime = prevTimer.remainingTime - 1;
        const updatedTimer = {
          ...prevTimer,
          remainingTime: newRemainingTime,
        };

        if (newRemainingTime <= 0) {
          handleTimerCompletion(updatedTimer);
        }
        updateTimer(updatedTimer);

        return updatedTimer;
      });
    }, 1000);
  };

  const handleTimerCompletion = async timer => {
    const completedTimer = {
      ...timer,
      status: 'Completed',
      remainingTime: 0,
    };
    await updateTimer(completedTimer);
    const historyEntry = {
      ...completedTimer,
      completedAt: new Date().toISOString(),
    };
    await saveTimerToHistory(historyEntry);

    if (onTimerCompleted) {
      onTimerCompleted(completedTimer);
    }
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleStart = async () => {
    try {
      const updatedTimer = {
        ...currentTimer,
        status: 'Running',
      };

      await updateTimer(updatedTimer);
      setCurrentTimer(updatedTimer);

      startInterval();

      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to start timer');
      console.error(error);
    }
  };

  const handlePause = async () => {
    try {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const updatedTimer = {
        ...currentTimer,
        status: 'Paused',
      };

      await updateTimer(updatedTimer);
      setCurrentTimer(updatedTimer);

      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pause timer');
      console.error(error);
    }
  };

  const handleReset = async () => {
    try {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      const updatedTimer = {
        ...currentTimer,
        status: 'Ready',
        remainingTime: currentTimer.duration,
      };

      await updateTimer(updatedTimer);
      setCurrentTimer(updatedTimer);

      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to reset timer');
      console.error(error);
    }
  };

  const progressPercentage =
    ((currentTimer.duration - currentTimer.remainingTime) /
      currentTimer.duration) *
    100;

  return (
    <View style={styles.container}>
      <View style={styles.timerDetails}>
        <Text style={styles.timerName}>{currentTimer.name}</Text>
        <View style={styles.timeSection}>
          <Text style={styles.timerTime}>
            {formatTime(currentTimer.remainingTime)}
          </Text>
        </View>
      </View>

      <ProgressBar percentage={progressPercentage} />

      <View style={styles.controls}>
        {currentTimer.status === 'Running' ? (
          <TouchableOpacity
            style={[styles.controlButton, styles.pauseButton]}
            onPress={handlePause}>
            <Feather name="pause" size={18} color="white" />
            <Text style={styles.controlText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.controlButton, styles.startButton]}
            onPress={handleStart}
            disabled={currentTimer.status === 'Completed'}>
            <Feather name="play" size={18} color="white" />
            <Text style={styles.controlText}>Start</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.controlButton, styles.resetButton]}
          onPress={handleReset}>
          <Feather name="refresh-cw" size={18} color="white" />
          <Text style={styles.controlText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  timerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timerName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerTime: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
  },
  controls: {
    flexDirection: 'row',
    marginTop: 12,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  startButton: {
    backgroundColor: colors.success,
  },
  pauseButton: {
    backgroundColor: colors.warning,
  },
  resetButton: {
    backgroundColor: colors.secondary,
  },
  controlText: {
    color: 'white',
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default TimerItem;
