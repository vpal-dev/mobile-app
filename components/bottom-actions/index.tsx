import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ButtonRaw } from '../ui/button';
import { Separator } from '../ui/separator';

export const BottomActions = () => {

  return (
    <>
      <Separator />

      <ButtonRaw style={styles.button}>
        <Text style={styles.comingSoon}>coming soon</Text>
        <Text style={styles.buttonTitle}>questionner</Text>
        <Text>create homework assignment, small quiz question paper for this.</Text>
      </ButtonRaw>
    </>

  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 16
  },
  comingSoon: {
    fontFamily: 'Itim',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10
  },
  buttonTitle: {
    fontWeight: 600,
    fontSize: 16,
    textDecorationStyle: "dotted",
    textDecorationLine: 'underline'
  }
})
