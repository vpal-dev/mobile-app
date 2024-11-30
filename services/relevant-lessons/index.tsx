import { APIFetch } from "@/lib/api-fetch"
import { supabase } from "@/lib/supabase"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useActiveUser } from "../auth"

export type UseCreateQAReturn = number

export const useGenerateRelevantLesson = () => {
  const { data: user } = useActiveUser()

  return useMutation({
    mutationFn: async (data: { learningObjective: string, classProfile: string }): Promise<UseCreateQAReturn> => {
      const res = await APIFetch.post('relevant-lesson/create', { body: data })

      const { data: sData, error: _ } = await supabase.from('relevant-lessons').insert({
        learningObjective: data.learningObjective,
        classProfile: data.classProfile,

        content: String(res?.content[0]?.text),
        user_id: String(user?.user?.id)
      }).select('id').single();

      return Number(sData?.id)
    }
  })
}

export const useGetRelevantLessons = () => {
  return useQuery({
    queryKey: ['all-relevant-lessons'],
    queryFn: async () => {
      const { data, error: _ } = await supabase.from('relevant-lessons').select('*').order('created_at', { ascending: false });
      return data
    },
  })
}

export const useGetRelevantLesson = (id: number) => {
  return useQuery({
    queryKey: ['relevant-lesson', id],
    queryFn: async () => {
      const { data, error: _ } = await supabase.from('relevant-lessons').select('*').eq('id', id).limit(1).single();
      return data
    },
  })
}
