import React from 'react';
import {Pressable, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface ButtonProps {
  text: string;
  onPress: () => void;
  containerStyles?: object;
}

const Button = ({text, onPress, containerStyles}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.root, containerStyles]} activeOpacity={0.7}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#cb11ab',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderStyle: 'solid',
    padding: 12,
    borderColor: '#cb11ab',
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default Button;
