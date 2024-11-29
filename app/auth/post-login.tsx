import React from 'react';
import { ScreenBanner } from '@/components/screen-banner';
import { SubmitButton } from '@/components/ui/button';
import { FormControl, FormField, FormFieldMessage, FormInput, FormLabel, FormSelect } from '@/components/ui/form';
import { useRouter } from 'expo-router';
import { PencilRulerIcon } from 'lucide-react-native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useCollectUserInfo } from '@/services/auth';

export default function CreateTeacherForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      subject: '',
      board: 'CBSE',
      state_board: '',
    },
  });

  const router = useRouter();

  const { mutateAsync, isPending } = useCollectUserInfo();

  const onSubmit = async (data: any) => {
    console.log(data);
    await mutateAsync(data);

    router.navigate('/home');
  };

  const board = watch('board'); // Watch board value to conditionally show state selection

  return (
    <ScrollView style={{ paddingHorizontal: 20, height: "100%" }}>
      <TopContent />

      <View style={styles.container}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <FormInput placeholder="Enter your name" value={value} onBlur={onBlur} onChangeText={onChange} />
              </FormControl>
              <FormFieldMessage>{errors.name && 'Name is required.'}</FormFieldMessage>
            </FormField>
          )}
          name="name"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <FormInput placeholder="Enter subject name" value={value} onBlur={onBlur} onChangeText={onChange} />
              </FormControl>
              <FormFieldMessage>{errors.subject && 'Subject is required.'}</FormFieldMessage>
            </FormField>
          )}
          name="subject"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField>
              <FormLabel>Board</FormLabel>
              <FormControl>
                <FormSelect
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  options={[
                    { label: 'CBSE', value: 'CBSE' },
                    { label: 'ICSE', value: 'ICSE' },
                    { label: 'State Board', value: 'State Board' },
                  ]}
                />
              </FormControl>
              <FormFieldMessage>{errors.board && 'Board is required.'}</FormFieldMessage>
            </FormField>
          )}
          name="board"
        />

        {board === 'State Board' && (
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <FormSelect
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    options={[
                      { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
                      { label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
                      { label: 'Assam', value: 'Assam' },
                      { label: 'Bihar', value: 'Bihar' },
                      { label: 'Chhattisgarh', value: 'Chhattisgarh' },
                      { label: 'Goa', value: 'Goa' },
                      { label: 'Gujarat', value: 'Gujarat' },
                      { label: 'Haryana', value: 'Haryana' },
                      { label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
                      { label: 'Jharkhand', value: 'Jharkhand' },
                      { label: 'Karnataka', value: 'Karnataka' },
                      { label: 'Kerala', value: 'Kerala' },
                      { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
                      { label: 'Maharashtra', value: 'Maharashtra' },
                      { label: 'Manipur', value: 'Manipur' },
                      { label: 'Meghalaya', value: 'Meghalaya' },
                      { label: 'Mizoram', value: 'Mizoram' },
                      { label: 'Nagaland', value: 'Nagaland' },
                      { label: 'Odisha', value: 'Odisha' },
                      { label: 'Punjab', value: 'Punjab' },
                      { label: 'Rajasthan', value: 'Rajasthan' },
                      { label: 'Sikkim', value: 'Sikkim' },
                      { label: 'Tamil Nadu', value: 'Tamil Nadu' },
                      { label: 'Telangana', value: 'Telangana' },
                      { label: 'Tripura', value: 'Tripura' },
                      { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
                      { label: 'Uttarakhand', value: 'Uttarakhand' },
                      { label: 'West Bengal', value: 'West Bengal' },
                      { label: 'Other', value: 'Other' },
                    ]}
                  />
                </FormControl>
                <FormFieldMessage>{errors.state_board && 'State is required.'}</FormFieldMessage>
              </FormField>
            )}
            name="state_board"
          />
        )}

        <SubmitButton
          isLoading={isPending}
          style={styles.submitBtn}
          text="Submit"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
}

const TopContent = () => (
  <ScreenBanner
    Icon={PencilRulerIcon}
    title="Teacher Form"
    subtitle="Fill in your details"
    description="Provide your name, subject, and board information."
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 20,
    height: '100%',
    marginTop: 20
  },
  submitBtn: {
    width: '100%',
    paddingVertical: 14,
    marginHorizontal: 'auto',
    marginTop: 'auto'
  },
});

