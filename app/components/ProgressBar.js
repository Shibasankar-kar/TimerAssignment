import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../constants/colors';

const ProgressBar = ({percentage}) => {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <View style={styles.container}>
      <View style={[styles.progress, {width: `${clampedPercentage}%`}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: colors.progressBackground,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.success,
  },
});

export default ProgressBar;
