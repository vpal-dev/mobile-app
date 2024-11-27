import { APIFetch } from "@/lib/api-fetch"
import { supabase } from "@/lib/supabase"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useActiveUser } from "../auth"

export type UseCreateLessonPlanReturn = number

export const useCreateLessonPlan = () => {
  const { data: user } = useActiveUser()

  return useMutation({
    mutationFn: async (data: { grade: number, topic: string }): Promise<UseCreateLessonPlanReturn> => {
      const res = await APIFetch.post('lesson-plans/create', { body: data })

      const { data: sData, error: _ } = await supabase.from('lesson-plans').insert({
        grade: data.grade,
        topic: data.topic,
        content: res?.content[0]?.text,
        user_id: user?.user?.id
      }).select('id').single();

      return sData?.id;
    }
  })
}

export const useGetLessonPlans = () => {
  return useQuery({
    queryKey: ['lesson-plans'],
    queryFn: async () => {
      const { data, error: _ } = await supabase.from('lesson-plans').select('*');
      return data
    },
  })
}

export const useGetLessonPlan = (id: number) => {
  return useQuery({
    queryKey: ['lesson-plan', id],
    queryFn: async () => {
      const { data, error: _ } = await supabase.from('lesson-plans').select('*').eq('id', id).limit(1).single();
      return data
    },
  })
}
