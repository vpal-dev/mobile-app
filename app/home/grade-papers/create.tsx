import React from 'react';
import { BackButton } from '@/components/back-button/back-button';
import { ScreenBanner } from '@/components/screen-banner';
import { Button, SubmitButton } from '@/components/ui/button';
import { Link, useRouter } from 'expo-router';
import { PencilRulerIcon } from 'lucide-react-native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { FEATURES_DATA } from '@/constants/features-data';
import { useGradePaper } from '@/services/grade-papers';
import * as ImagePicker from 'expo-image-picker';
import { ControlledGradeInput, ControlledPhotoUpload } from '@/components/common-inputs';
import { AuthButtonWrapper } from '@/components/auth-btn-wrapper';

export default function CreateScreen() {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, },
  } = useForm<{ grade: number, photos: ImagePicker.ImagePickerAsset[] }>({
    defaultValues: {
      grade: 10,
      photos: [],
    },
  })

  const router = useRouter()
  const { mutateAsync, isPending } = useGradePaper()

  const onSubmit = async (data: any) => {
    const { grade, photos } = data;

    if (!photos.length) {
      alert('Please upload papers.')
      return;
    }

    const id = await mutateAsync({ grade, photos })
    router.navigate(`/home/grade-papers/${id}`)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <BackButton />
          <Link asChild href="/home/grade-papers">
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

          <ControlledPhotoUpload
            control={control}
            errors={errors}
            name="photos"
            watch={watch}
            setValue={setValue}
          />

          <AuthButtonWrapper>
            <SubmitButton isLoading={isPending} text='Grade Papers' onPress={handleSubmit(onSubmit)} />
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
        title={FEATURES_DATA.GRADE_PAPERS.title}
        subtitle={FEATURES_DATA.GRADE_PAPERS.subtitle}
        description={FEATURES_DATA.GRADE_PAPERS.description}
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
});

