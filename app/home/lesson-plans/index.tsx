import { BackButton } from '@/components/back-button/back-button';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useGetLessonPlans } from '@/services/lesson-plans';
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function AllLessons() {
  const { data } = useGetLessonPlans()

  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <BackButton />

        <Link asChild href="/home/lesson-plans/create">
          <Button text='New' />
        </Link>
      </View>

      <Text style={styles.title}>All Lessons</Text>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {data?.map((lesson) => {
          const { title, shortDescription } = JSON.parse(lesson.content.toString());

          return (
            <Link href={`/home/lesson-plans/${lesson.id}`} key={lesson.id}>
              <Container style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>{title}</Text>
                <Text style={{ fontSize: 14, color: '#5A5A5A' }}>{shortDescription}</Text>
                <Text style={{ fontSize: 12, color: '#5A5A5A' }}>{lesson.created_at}</Text>
              </Container>
            </Link>
          )
        })}
      </ScrollView>

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
  },
  scrollView: {
    gap: 10
  }
});

