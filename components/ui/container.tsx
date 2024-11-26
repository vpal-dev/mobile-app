import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type ContainerProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>
};

export const Container = ({ children, style }: ContainerProps) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,

    borderRadius: 9,
    borderWidth: 1,
    borderColor: 'rgba(210, 210, 210, 1)',
    backgroundColor: 'white',

    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 2,
    alignSelf: 'flex-start',
  },
});

