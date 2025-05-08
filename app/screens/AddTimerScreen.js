import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../constants/colors';
import {saveTimer} from '../utility/storage';
import CustomTextInput from '../components/CustomTextInput';

const AddTimerScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const handleDurationChange = text => {
    setDuration(text);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a timer name');
      return;
    }

    if (!duration || duration <= 0) {
      Alert.alert('Error', 'Please enter a valid duration in seconds');
      return;
    }

    if (!category.trim()) {
      Alert.alert('Error', 'Please enter a category');
      return;
    }

    try {
      const newTimer = {
        id: Date.now().toString(),
        name: name.trim(),
        duration: parseInt(duration),
        category: category.trim(),
        status: 'Ready',
        remainingTime: parseInt(duration),
        createdAt: new Date().toISOString(),
      };
      
      await saveTimer(newTimer);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save timer');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Add New Timer</Text>
          <View style={styles.placeholder} />
        </View>

        <View>
          <CustomTextInput
            label="Name"
            placeholder="e.g., Workout Timer"
            value={name}
            onChangeText={setName}
          />

          <CustomTextInput
            label="Duration (seconds)"
            placeholder="e.g., 300"
            value={duration}
            onChangeText={handleDurationChange}
            keyboardType="numeric"
          />

          <CustomTextInput
            label="Category"
            placeholder="e.g., Workout, Study, Break"
            value={category}
            onChangeText={setCategory}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create Timer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },

  categoriesSection: {
    marginBottom: 20,
  },
  categoriesLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: colors.textSecondary,
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryChipText: {
    color: colors.primary,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddTimerScreen;
