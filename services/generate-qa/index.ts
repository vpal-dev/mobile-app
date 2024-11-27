import { APIFetch } from "@/lib/api-fetch"
import { supabase } from "@/lib/supabase"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useActiveUser } from "../auth"

export type UseCreateQAReturn = number

export const useGenerateQA = () => {
  const { data: user } = useActiveUser()

  return useMutation({
    mutationFn: async (data: { grade: number, topic: string, noOfQuestions: number, type: string }): Promise<UseCreateQAReturn> => {
      const res = await APIFetch.post('generate-qa/create', { body: data })

      const { data: sData, error: _ } = await supabase.from('qa').insert({
        grade: data.grade,
        topic: data.topic,
        noOfQuestions: data.noOfQuestions,
        type: data.type,

        content: res?.content[0]?.text,
        user_id: user?.user?.id
      }).select('id').single();

      return sData?.id;
    }
  })
}

export const useGetQAs = () => {
  return useQuery({
    queryKey: ['all-QAs'],
    queryFn: async () => {
      const { data, error: _ } = await supabase.from('qa').select('*');
      return data
    },
  })
}

export const useGetQA = (id: number) => {
  return useQuery({
    queryKey: ['qa', id],
    queryFn: async () => {
      const { data, error: _ } = await supabase.from('qa').select('*').eq('id', id).limit(1).single();
      return data
    },
  })
}