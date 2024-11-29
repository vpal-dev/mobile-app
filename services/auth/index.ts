import { supabase } from '@/lib/supabase';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useActiveUser = () => {
  return useQuery({
    queryKey: ['active-user'],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser()
      return data
    },
  })
}

export const useCollectUserInfo = () => {
  const { data: user } = useActiveUser()

  return useMutation({
    mutationFn: async (data: { name: string, subject: string, board: string, state_board: string }) => {
      const { data: sData, error } = await supabase.from('users').upsert({ ...data, user_id: user?.user?.id })
      return sData
    },
  })
}
