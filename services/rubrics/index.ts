import { APIFetch } from "@/lib/api-fetch"
import { supabase } from "@/lib/supabase"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useActiveUser } from "../auth"

export const useGenerateRubrics = () => {
  const { data: user } = useActiveUser()

  return useMutation({
    mutationFn: async (data: { topic: string, grade: number }): Promise<number> => {
      const res = await APIFetch.post('create-rubrics', { body: data })

      const { data: sData, error: _ } = await supabase.from('rubrics').insert({
        topic: data.topic,
        grade: data.grade,
        content: String(res?.content[0]?.text),
        user_id: String(user?.user?.id),
      }).select('id').single();

      return Number(sData?.id)
    }
  })
}

export const useGetAllRubrics = () => {
  return useQuery({
    queryKey: ['all-rubrics'],
    queryFn: async () => {
      const { data, error: _ } = await supabase.from('rubrics').select('*').order('created_at', { ascending: false });
      return data
    },
  })
}

export const useGetRubric = (id: number) => {
  return useQuery({
    queryKey: ['rubrics', id],
    queryFn: async () => {
      const { data, error: _ } = await supabase.from('rubrics').select('*').eq('id', id).limit(1).single();
      return data
    },
  })
}
