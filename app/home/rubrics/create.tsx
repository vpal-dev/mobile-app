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
import { ControlledGradeInput, ControlledTextInput } from '@/components/common-inputs';
import { AuthButtonWrapper } from '@/components/auth-btn-wrapper';

export default function CreateScreen() {
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
  const { mutateAsync, isPending } = useGenerateRelevantLesson()

  const onSubmit = async (data: any) => {
    const id = await mutateAsync(data)
    router.navigate(`/home/rubrics/${id}`)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <BackButton />
          <Link asChild href="/home/rubrics">
            <Button text='History' />
          </Link>
        </View>

        <TopContent />

        <View>
          <ControlledGradeInput
            name="grade"
            control={control}
            errors={errors}
          />
          <ControlledTextInput
            name="topic"
            control={control}
            rules={{
              required: true,
            }}
            label="Topic"
            placeholder="writing essay, quadratic equations, etc."
            errors={errors}
          />

          <AuthButtonWrapper>
            <SubmitButton isLoading={isPending} style={styles.submitBtn} text='Generate Rubrics' onPress={handleSubmit(onSubmit)} />
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
        title={FEATURES_DATA.RUBRICS.title}
        subtitle={FEATURES_DATA.RUBRICS.subtitle}
        description={FEATURES_DATA.RUBRICS.description}
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

