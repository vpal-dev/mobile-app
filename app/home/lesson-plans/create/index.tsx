import React from 'react';
import { BackButton } from '@/components/back-button/back-button';
import { ScreenBanner } from '@/components/screen-banner';
import { Button, SubmitButton } from '@/components/ui/button';
import { FormControl, FormField, FormFieldMessage, FormInput, FormLabel } from '@/components/ui/form';
import { Link, useRouter } from 'expo-router';
import { PencilRulerIcon } from 'lucide-react-native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useCreateLessonPlan } from '@/services/lesson-plans';
import { FEATURES_DATA } from '@/constants/features-data';
import { ControlledGradeInput } from '@/components/common-inputs';
import { AuthButtonWrapper } from '@/components/auth-btn-wrapper';

export default function CreateLessonPlanScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      grade: 10,
      topic: ""
    },
  })

  const router = useRouter()
  const { mutateAsync, isPending } = useCreateLessonPlan()

  const onSubmit = async (data: any) => {
    const { grade, topic } = data;

    const id = await mutateAsync({ grade, topic })
    router.navigate(`/home/lesson-plans/${id}`)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <BackButton />
          <Link asChild href="/home/lesson-plans">
            <Button text='History' />
          </Link>
        </View>

        <TopContent />

        <View>
          <ControlledGradeInput
            control={control}
            errors={errors}
            name="grade"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField>
                <FormLabel>What would you like to teach?</FormLabel>
                <FormControl>
                  <FormInput placeholder="quadratic equations" value={value} onBlur={onBlur} onChangeText={onChange} />
                </FormControl>
                <FormFieldMessage>
                  {errors.topic && 'This is required.'}
                </FormFieldMessage>
              </FormField>

            )}
            name="topic"
          />

          <AuthButtonWrapper>
            <SubmitButton isLoading={isPending} style={styles.submitBtn} text='Create Lesson Plan' onPress={handleSubmit(onSubmit)} />
          </AuthButtonWrapper>
        </View>
      </View>
    </ScrollView >
  );
}


const TopContent = () => {
  return (
    <>
      {/*
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
    */}

      <ScreenBanner
        Icon={PencilRulerIcon}
        title={FEATURES_DATA.LESSON_PLANS.title}
        subtitle={FEATURES_DATA.LESSON_PLANS.subtitle}
        description={FEATURES_DATA.LESSON_PLANS.description}
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

