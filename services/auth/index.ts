import { supabase } from '@/lib/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePostHog } from 'posthog-react-native';
import { Alert } from 'react-native';

const activeUserQueryKey = ['active-user']

export const useActiveUser = () => {
  return useQuery({
    queryKey: activeUserQueryKey,
    queryFn: async () => {
      const { data } = await supabase.auth.getUser()
      return data
    },
  })
}

export const useOTPVerify = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { phoneNo: number | string, otp: string }) => {
      const {
        error,
      } = await supabase.auth.verifyOtp({
        phone: String(data.phoneNo),
        token: data.otp,
        type: 'sms',
      })

      if (error) {
        Alert.alert(error.message)
        return
      }

      queryClient.invalidateQueries({ queryKey: activeUserQueryKey })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const posthog = usePostHog()

  return useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut()
      posthog.reset()
      queryClient.invalidateQueries({ queryKey: activeUserQueryKey })
    },
  })
}

export const useCollectUserInfo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { name: string, subject: string, board: string, state_board: string }) => {
      const { data: authData, error: updateUserError } = await supabase.auth.updateUser({ data: { full_name: data.name, ...data } })
      if (updateUserError) console.error("update user error", updateUserError)

      queryClient.invalidateQueries({ queryKey: activeUserQueryKey })

      return authData
    },
  })
}
