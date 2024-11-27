import { BackButton } from '@/components/back-button/back-button';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function AllLessons() {
  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <BackButton />

        <Link asChild href="/home/lesson-plans/create">
          <Button text='New' />
        </Link>
      </View>

      <Text style={styles.title}>All Lessons</Text>


      <Link href="/home/lesson-plans/123">
        <Container style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>Lesson 1</Text>
          <Text style={{ fontSize: 14, color: '#5A5A5A' }}>This is a description of the lesson</Text>
        </Container>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',

    marginVertical: 20,
    marginTop: 40
  }
});
