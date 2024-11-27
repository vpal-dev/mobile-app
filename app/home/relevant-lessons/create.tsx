import React from 'react';
import { BackButton } from '@/components/back-button/back-button';
import { ScreenBanner } from '@/components/screen-banner';
import { Button, SubmitButton } from '@/components/ui/button';
import { FormControl, FormField, FormFieldMessage, FormInput, FormLabel } from '@/components/ui/form';
import { Link, useRouter } from 'expo-router';
import { PencilRulerIcon } from 'lucide-react-native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { FEATURES_DATA } from '@/constants/features-data';
import { useGenerateRelevantLesson } from '@/services/relevant-lessons';

export default function CreateScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      learningObjective: "",
      classProfile: ""
    },
  })

  const router = useRouter()
  const { mutateAsync } = useGenerateRelevantLesson()

  const onSubmit = async (data: any) => {
    const { learningObjective, classProfile } = data;

    const id = await mutateAsync({ learningObjective, classProfile })
    router.navigate(`/home/relevant-lessons/${id}`)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <BackButton />
          <Link asChild href="/home/relevant-lessons">
            <Button text='History' />
          </Link>
        </View>

        <TopContent />

        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField>
                <FormLabel>Learning Objective</FormLabel>
                <FormControl>
                  <FormInput
                    style={{ height: 100 }}
                    placeholder="e.g., Calculating the average rate of change of a polynomial between two points..."
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                </FormControl>
                <FormFieldMessage>
                  {errors.learningObjective && 'This is required.'}
                </FormFieldMessage>
              </FormField>

            )}
            name="learningObjective"
          />


          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField>
                <FormLabel>Class Profile</FormLabel>
                <FormControl>
                  <FormInput
                    style={{ height: 100 }}
                    placeholder="e.g., Many students in my 6th grade class are big soccer fans..."
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                </FormControl>
                <FormFieldMessage>
                  {errors.learningObjective && 'This is required.'}
                </FormFieldMessage>
              </FormField>

            )}
            name="classProfile"
          />

          <SubmitButton style={styles.submitBtn} text='Generate Relevant Plan' onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </ScrollView>
  );
}


const TopContent = () => {
  return (
    <>
      <ScreenBanner
        Icon={PencilRulerIcon}
        title={FEATURES_DATA.RELEVANT_LESSON_PLANS.title}
        subtitle={FEATURES_DATA.RELEVANT_LESSON_PLANS.subtitle}
        description={FEATURES_DATA.RELEVANT_LESSON_PLANS.description}
      />
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,

    display: 'flex',
    flexDirection: 'column',
    gap: 12,


    paddingBottom: 20,

    height: '100%',
  },
  topActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitBtn: {
    width: '100%',
    paddingVertical: 14,
    marginHorizontal: 'auto'
  }
});

