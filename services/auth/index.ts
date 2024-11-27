import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

export const useActiveUser = () => {
  return useQuery({
    queryKey: ['active-user'],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser()
      return data
    },
  })
}

