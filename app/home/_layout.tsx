import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function HomeLayout() {
  return (
    <Stack
      layout={(props) => <View style={styles.container} {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Home Dashboard',
        }}
      />

      {
        [
          { name: 'Create Lesson', href: 'lesson-plans/create/index' },
          { name: 'All Lessons', href: 'lesson-plans/index' },
          { name: 'Get Lesson', href: 'lesson-plans/[id]/index' },

          { name: 'Generate Assignment', href: 'generate-qa/create' },
          { name: 'All Generated Assignment', href: 'generate-qa/index' },
          { name: 'Generated Assignment', href: 'generate-qa/[id]' },

          { name: 'Create Relevant Lessons', href: 'relevant-lessons/create' },
          { name: 'All Relevant Lessons', href: 'relevant-lessons/index' },
          { name: 'Get Relevant Lessons', href: 'relevant-lessons/[id]' },

          { name: 'Grade Papers', href: 'grade-papers/create' },
          { name: 'All Graded Papers', href: 'grade-papers/index' },
          { name: 'Get Graded Paper', href: 'grade-papers/[id]' },

          { name: "Level Assignments", href: 'leveller/create' },
          { name: "All Levelled Assignments", href: 'leveller/index' },
          { name: "Get Levelled Assignment", href: 'leveller/[id]' },

          { name: "Create Rubrics", href: 'rubrics/create' },
          { name: "All Rubrics", href: 'rubrics/index' },
          { name: "Get Rubric", href: 'rubrics/[id]' },

          { name: 'Create Differently Abled', href: 'differently-abled/create' },
          { name: 'All Differently Abled', href: 'differently-abled/index' },
          { name: 'Get Differently Abled', href: 'differently-abled/[id]' },
        ].map((item) => {
          return (
            <Stack.Screen
              key={item.name}
              name={item.href}
              options={{
                title: item.name,
              }}
            />
          )
        })
      }
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
})
