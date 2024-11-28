import React from 'react';
import { BackButton } from '@/components/back-button/back-button';
import { ScreenBanner } from '@/components/screen-banner';
import { Button, IconButton, SubmitButton } from '@/components/ui/button';
import { FormControl, FormField, FormFieldMessage, FormInput, FormInputAction, FormLabel, FormSelect } from '@/components/ui/form';
import { Link, useRouter } from 'expo-router';
import { CameraIcon, PencilRulerIcon, UploadIcon } from 'lucide-react-native';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { FEATURES_DATA } from '@/constants/features-data';
import * as ImagePicker from 'expo-image-picker';
import { useLevelAssignment } from '@/services/leveller';

export default function CreateScreen() {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, },
  } = useForm<{ grade: number, photos: ImagePicker.ImagePickerAsset[], description: '' }>({
    defaultValues: {
      grade: 10,
      photos: [],
      description: ''
    },
  })

  const router = useRouter()
  const { mutateAsync } = useLevelAssignment()

  const photos = watch('photos')

  const onPhotosUploadPress = async (type: 'camera' | 'gallery') => {


    let result = null;

    if (type === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
        base64: true
      });
    }

    if (type === 'gallery') {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
        base64: true
      });
    }

    if (result && !result?.canceled) {
      setValue('photos', result.assets);
    }
  }


  const onSubmit = async (data: any) => {
    const { grade, photos, description } = data;

    if (!photos.length) {
      alert('Please upload papers.')
      return;
    }

    const id = await mutateAsync({ grade, photos, description })
    router.navigate(`/home/grade-papers/${id}`)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <BackButton />
          <Link asChild href="/home/leveller">
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
                <FormLabel>Grade</FormLabel>
                <FormControl>
                  <FormSelect
                    value={String(value)}
                    onChange={onChange}
                    onBlur={onBlur}
                    options={[
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "3", value: "3" },
                      { label: "4", value: "4" },
                      { label: "5", value: "5" },
                      { label: "6", value: "6" },
                      { label: "7", value: "7" },
                      { label: "8", value: "8" },
                      { label: "9", value: "9" },
                      { label: "10", value: "10" },
                    ]}
                  />
                </FormControl>

                <FormFieldMessage>
                  {errors.grade && 'This is required.'}
                </FormFieldMessage>
              </FormField>
            )}
            name="grade"
          />


          <FormField>
            <FormLabel>Upload Papers</FormLabel>
            <FormControl style={{ flexDirection: 'row', gap: 10 }}>
              <Button
                onPress={() => onPhotosUploadPress('camera')}
                style={{ flex: 1, paddingVertical: 16 }}
                text="Camera"
              />

              <Button
                onPress={() => onPhotosUploadPress('gallery')}
                style={{ flex: 1, paddingVertical: 16 }}
                text="Gallery"
              />
              <FormInputAction>
                <IconButton Icon={UploadIcon} />
              </FormInputAction>

              <FormInputAction style={{ right: '55%' }}>
                <IconButton Icon={CameraIcon} />
              </FormInputAction>
            </FormControl>

            {photos.length > 0 ? photos.map((photo) => {
              return (
                <Image
                  key={photo.uri}
                  style={{ width: '100%', height: 200, marginVertical: 10 }}
                  source={{ uri: photo.uri }}
                />
              )
            }) : null}
          </FormField>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField style={{ marginTop: 30 }}>
                <FormLabel>How would you like to modify the assignment?</FormLabel>
                <FormControl>
                  <FormInput placeholder="make it for a 6th standard ADHD student" value={value} onBlur={onBlur} onChangeText={onChange} />
                </FormControl>
                <FormFieldMessage>
                  {errors.description && 'This is required.'}
                </FormFieldMessage>
              </FormField>

            )}
            name="description"
          />


          <SubmitButton style={styles.submitBtn} text='Generate Variation' onPress={handleSubmit(onSubmit)} />
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
        title={FEATURES_DATA.LEVELLER.title}
        subtitle={FEATURES_DATA.LEVELLER.subtitle}
        description={FEATURES_DATA.LEVELLER.description}
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
    marginTop: 20,
    marginHorizontal: 'auto'
  }
});

