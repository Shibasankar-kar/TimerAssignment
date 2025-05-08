import AsyncStorage from '@react-native-async-storage/async-storage';

const timeStorageKey = 'timerStorage';
const historyStorageKey = 'historyStorage';


// timer action storage functions
export const saveTimer = async timer => {
  try {
    const timers = await getTimers();
    timers.push(timer);
    await AsyncStorage.setItem(timeStorageKey, JSON.stringify(timers));
  } catch (error) {
    console.error('Error saving timer to storage:', error);
    throw error;
  }
};

export const getTimers = async () => {
  try {
    const timersJson = await AsyncStorage.getItem(timeStorageKey);
    return timersJson ? JSON.parse(timersJson) : [];
  } catch (error) {
    console.error('Error getting timers from storage:', error);
    throw error;
  }
};

export const updateTimer = async updatedTimer => {
  try {
    const timers = await getTimers();
    const timerIndex = timers.findIndex(timer => timer.id === updatedTimer.id);

    if (timerIndex !== -1) {
      timers[timerIndex] = updatedTimer;
      await AsyncStorage.setItem(timeStorageKey, JSON.stringify(timers));
    }
  } catch (error) {
    console.error('Error updating timer in storage:', error);
    throw error;
  }
};

// timer mass action storage functions
export const startAllTimersInCategory = async category => {
  try {
    const timers = await getTimers();
    const updatedTimers = timers.map(timer => {
      if (timer.category === category && timer.status !== 'Completed') {
        return {...timer, status: 'Running'};
      }
      return timer;
    });

    await AsyncStorage.setItem(timeStorageKey, JSON.stringify(updatedTimers));
  } catch (error) {
    console.error('Error starting all timers in category:', error);
    throw error;
  }
};

export const pauseAllTimersInCategory = async category => {
  try {
    const timers = await getTimers();
    const updatedTimers = timers.map(timer => {
      if (timer.category === category && timer.status === 'Running') {
        return {...timer, status: 'Paused'};
      }
      return timer;
    });

    await AsyncStorage.setItem(timeStorageKey, JSON.stringify(updatedTimers));
  } catch (error) {
    console.error('Error pausing all timers in category:', error);
    throw error;
  }
};

export const resetAllTimersInCategory = async category => {
  try {
    const timers = await getTimers();
    const updatedTimers = timers.map(timer => {
      if (timer.category === category) {
        return {
          ...timer,
          status: 'Ready',
          remainingTime: timer.duration,
        };
      }
      return timer;
    });

    await AsyncStorage.setItem(timeStorageKey, JSON.stringify(updatedTimers));
  } catch (error) {
    console.error('Error resetting all timers in category:', error);
    throw error;
  }
};

// timer history
export const getTimerHistory = async () => {
  try {
    const historyJson = await AsyncStorage.getItem(historyStorageKey);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error('Error getting timer history from storage:', error);
    throw error;
  }
};

export const saveTimerToHistory = async timer => {
  try {
    const history = await getTimerHistory();
    history.push(timer);
    await AsyncStorage.setItem(historyStorageKey, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving timer to history:', error);
    throw error;
  }
};
