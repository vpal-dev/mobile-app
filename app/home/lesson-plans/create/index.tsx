import { ActionBanner } from '@/components/action-banner';
import { BackButton } from '@/components/back-button/back-button';
import { ScreenBanner } from '@/components/screen-banner';
import { Button, IconButton } from '@/components/ui/button';
import { FormControl, FormField, FormInput, FormInputAction, FormLabel } from '@/components/ui/form';
import { Link } from 'expo-router';
import { ArrowDownToDotIcon, PencilRulerIcon } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <BackButton />
        <Link asChild href="/home/lesson-plans">
          <Button text='History' />
        </Link>
      </View>

      <ActionBanner
        title='Personalize Lesson Plans'
        Description={(({ fontSize, color }) => {
          return (
            <Text style={{ fontSize, color }}>Get Lessons plans to the way you write! Upload some examples and Vpal will create lesson plans as you do.</Text>
          )
        })}
        buttonText='Upload Lesson Plans'
        onPress={() => console.log('Upload Lesson Plans')}
      />


      <ScreenBanner
        Icon={PencilRulerIcon}
        title='Create lesson plans in 2 mins '
        subtitle='12k users'
        description={
          `
Simply input your topic and requirements, 
and Vpal generates detailed lesson plans with objectives, activities, and assessments. 
Customise as needed and save your preferred templates.
          `
        }
      />


      <FormField style={{ width: '100%' }}>
        <FormLabel>Grade</FormLabel>
        <FormControl>
          <FormInput placeholder="Grade" />
          <FormInputAction>
            <IconButton Icon={ArrowDownToDotIcon} style={{ paddingHorizontal: 8 }} />
          </FormInputAction>
        </FormControl>

      </FormField>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    display: 'flex',
    flexDirection: 'column',
    gap: 12,


    paddingBottom: 20
  },
  topActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

