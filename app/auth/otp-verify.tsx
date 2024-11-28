import { View, Text, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form"
import { FormControl, FormField, FormInput, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';

export default function OPTVerifyScreen() {
  const { bottom } = useSafeAreaInsets();
  const { phoneNo } = useLocalSearchParams();

  const router = useRouter();


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  })

  const client = useQueryClient()

  const onSubmit = async (data: any) => {
    const otp = data.otp;

    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      phone: String(phoneNo),
      token: otp,
      type: 'sms',
    })

    if (error) {
      Alert.alert(error.message)
      return
    }

    client.invalidateQueries({ queryKey: ['active-user'] })

    router.navigate('/home')
  }

  return (
    <View style={styles.container}>
      <View style={[formStyles.container, { paddingBottom: bottom }]}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField>
              <FormLabel>OTP</FormLabel>
              <FormControl style={formStyles.control}>
                <FormInput
                  style={{ flex: 1 }}
                  placeholder="123456"
                  inputMode="numeric"
                  keyboardType='number-pad'
                  maxLength={6}
                  autoComplete='one-time-code'

                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </FormControl>
            </FormField>
          )}
          name="otp"
          rules={{ required: "OTP is required" }}
        />
        {errors.otp && <Text>{errors.otp.message}</Text>}

        <Button style={formStyles.loginBtn} text='Login' onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

    display: 'flex',
  },

});

const formStyles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    gap: 4
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  loginBtn: {
    width: '100%',
    paddingVertical: 12,
    marginHorizontal: 'auto'
  }
});

