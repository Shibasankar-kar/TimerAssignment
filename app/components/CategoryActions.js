import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import colors from '../constants/colors';
import {
  pauseAllTimersInCategory,
  resetAllTimersInCategory,
  startAllTimersInCategory,
} from '../utility/storage';
import ActionButton from './ActionButton';

const CategoryActions = ({
  visible,
  category,
  hasActiveTimers,
  onClose,
  onRefresh,
}) => {
  const handleStartAll = async () => {
    try {
      await startAllTimersInCategory(category);
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Failed to start all timers:', error);
    }
  };

  const handlePauseAll = async () => {
    try {
      await pauseAllTimersInCategory(category);
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Failed to pause all timers:', error);
    }
  };

  const handleResetAll = async () => {
    try {
      await resetAllTimersInCategory(category);
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Failed to reset all timers:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{category}</Text>

              <ActionButton
                icon="play"
                text="Start All Timers"
                color={colors.success}
                onPress={handleStartAll}
              />

              <ActionButton
                icon="pause"
                text="Pause All Timers"
                color={colors.warning}
                onPress={handlePauseAll}
                disabled={!hasActiveTimers}
              />

              <ActionButton
                icon="refresh-cw"
                text="Reset All Timers"
                color={colors.secondary}
                onPress={handleResetAll}
              />

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
    color: colors.primary,
    paddingVertical: 15,
  },
  closeButton: {
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginTop: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});

export default CategoryActions;
