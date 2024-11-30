import React from 'react';
import { BackButton } from '@/components/back-button/back-button';
import { ScreenBanner } from '@/components/screen-banner';
import { Button, SubmitButton } from '@/components/ui/button';
import { Link, useRouter } from 'expo-router';
import { PencilRulerIcon } from 'lucide-react-native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { FEATURES_DATA } from '@/constants/features-data';
import { useGenerateRelevantLesson } from '@/services/relevant-lessons';
import { ControlledTextInput } from '@/components/common-inputs';
import { AuthButtonWrapper } from '@/components/auth-btn-wrapper';

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
  const { mutateAsync, isPending } = useGenerateRelevantLesson()

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
          <ControlledTextInput
            name="learningObjective"
            control={control}
            rules={{
              required: true,
            }}
            label="Learning Objective"
            placeholder="e.g., Calculating the average rate of change of a polynomial between two points..."
            errors={errors}
          />
          <ControlledTextInput
            name="classProfile"
            control={control}
            rules={{
              required: true,
            }}
            label="Class Profile"
            placeholder="e.g., Many students in my 6th grade class are big soccer fans..."
            errors={errors}
          />

          <AuthButtonWrapper>
            <SubmitButton isLoading={isPending} style={styles.submitBtn} text='Generate Relevant Plan' onPress={handleSubmit(onSubmit)} />
          </AuthButtonWrapper>
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

