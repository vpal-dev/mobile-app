import { BackButton } from '@/components/back-button/back-button';
import { Button, ButtonRaw } from '@/components/ui/button';
import { Link, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function LessonID() {
  const { id } = useLocalSearchParams<{ id: string }>();


  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <BackButton />

        <Link asChild href="/home/lesson-plans/create">
          <Button text='New' />
        </Link>
      </View>

      <Text style={styles.title}>LESSON: {id}</Text>


      <ButtonRaw style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, paddingVertical: 16 }}>
        <Text style={{ fontWeight: 600, fontSize: 16, textDecorationStyle: "dotted", textDecorationLine: 'underline' }}>questionner</Text>
        <Text>create homework assignment, small quiz question paper for this.</Text>
      </ButtonRaw>
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

