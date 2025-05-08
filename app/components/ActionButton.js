import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../constants/colors';

const ActionButton = ({icon, text, color, onPress, disabled = false}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles.actionButton,
        {opacity: disabled ? 0.5 : 1},
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Feather name={icon} size={20} color={color} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginRight: 10,
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    backgroundColor: colors.cardAlt,
    marginBottom: 12,
  },
});

export default ActionButton;
