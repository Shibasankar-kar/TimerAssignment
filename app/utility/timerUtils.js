export const groupTimersByCategory = timers => {
  const grouped = {};
  for (const timer of timers) {
    if (!grouped[timer.category]) {
      grouped[timer.category] = [];
    }
    grouped[timer.category].push(timer);
  }

  return Object.entries(grouped).map(([category, timers]) => ({
    category,
    timers,
  }));
};

export const formatTime = seconds => {
  if (!seconds && seconds !== 0) return '--:--';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  if (hours > 0) {
    const formattedHours = String(hours).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const calculateProgress = timer => {
  if (!timer || !timer.duration) return 0;

  const elapsed = timer.duration - timer.remainingTime;
  return Math.min(100, Math.max(0, (elapsed / timer.duration) * 100));
};
