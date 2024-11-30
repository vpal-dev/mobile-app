import { APIFetch } from "@/lib/api-fetch"
import { supabase } from "@/lib/supabase"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useActiveUser } from "../auth"

export type UseCreateQAReturn = number

export const useGenerateDifferentlyAbledLesson = () => {
  const { data: user } = useActiveUser()

  return useMutation({
    mutationFn: async (data: { type: string, topic: string, grade: number }): Promise<UseCreateQAReturn> => {
      const res = await APIFetch.post('create-differently-abled-lesson-plan', { body: data })

      const { data: sData, error: _ } = await supabase.from('differently-abled').insert({
        type: data.type,
        grade: data.grade,
        topic: data.topic,

        content: String(res?.content[0]?.text),
        user_id: String(user?.user?.id)
      }).select('id').single();

      return Number(sData?.id)
    }
  })
}

export const useGetDifferentlyAbledLessons = () => {
  return useQuery({
    queryKey: ['all-differently-abled-lessons'],
    queryFn: async () => {
      const { data, error: _ } = await supabase.from('differently-abled').select('*').order('created_at', { ascending: false });
      return data
    },
  })
}

export const useGetDifferentlyAbledLesson = (id: number) => {
  return useQuery({
    queryKey: ['differently-able-lesson', id],
    queryFn: async () => {
      const { data, error: _ } = await supabase.from('differently-abled').select('*').eq('id', id).limit(1).single();
      return data
    },
  })
}



