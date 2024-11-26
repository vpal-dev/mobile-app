import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowDownRight } from 'lucide-react-native'
import { Redirect } from 'expo-router';

export default function HomeScreen() {
  return (
    <Redirect href="/home" />
  )

  return (
    <View style={styles.container}>
      <Text>HOME</Text>
      <Button text='hello' />

      <Container style={styles.box}>
        <Text>Container</Text>
        <Button text='history' Icon={ArrowDownRight} />
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 200,
    height: 200,
  }
});

