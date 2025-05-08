import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import colors from '../constants/colors';

const CustomTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  numberOfLines = 1,
}) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.text,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: colors.inputBackground,
    color: colors.text,
  },
});

export default CustomTextInput;
