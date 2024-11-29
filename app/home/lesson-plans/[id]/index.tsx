import { BackButton } from '@/components/back-button/back-button';
import { BottomActions } from '@/components/bottom-actions';
import { SimpleCard } from '@/components/card/card';
import { Markdown } from '@/components/markdown';
import { Button, } from '@/components/ui/button';
import { useGetLessonPlan } from '@/services/lesson-plans';
import { Link, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function LessonID() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: _data, isLoading } = useGetLessonPlan(parseInt(id))

  const data = useMemo(() => {
    const { title = "", shortDescription = "", content = "" } = JSON.parse(_data?.content || "{}")

    return {
      title,
      shortDescription,
      content,
    }
  }, [_data])

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <ScrollView style={{ height: '100%' }} contentContainerStyle={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <BackButton />

        <Link asChild href="/home/lesson-plans/create">
          <Button text='New' />
        </Link>
      </View>

      <SimpleCard title={data.title} description={data.shortDescription} />
      <Markdown>{data.content}</Markdown>
      <BottomActions />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {}
});

