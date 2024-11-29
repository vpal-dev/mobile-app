import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonRaw } from '../ui/button';

export const BottomActions = () => {

  return (
    <>
      <View style={styles.seperator} />

      <ButtonRaw style={styles.button}>
        <Text style={styles.comingSoon}>coming soon</Text>
        <Text style={styles.buttonTitle}>questionner</Text>
        <Text>create homework assignment, small quiz question paper for this.</Text>
      </ButtonRaw>
    </>

  )
}

const styles = StyleSheet.create({
  seperator: {
    marginVertical: 20,
    marginTop: 50,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.2)'
  },
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
