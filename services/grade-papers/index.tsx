import { APIFetch } from "@/lib/api-fetch"
import { supabase } from "@/lib/supabase"
import { decode } from 'base64-arraybuffer';
import { useMutation, useQuery } from "@tanstack/react-query"
import { useActiveUser } from "../auth"
import { ImagePickerAsset } from "expo-image-picker";
import { nanoid } from "nanoid";

export type UseCreateQAReturn = number

export const useGradePaper = () => {
  const { data: user } = useActiveUser()

  return useMutation({
    mutationFn: async (data: { grade: number, photos: ImagePickerAsset[] }): Promise<UseCreateQAReturn> => {
      const photo = data.photos[0];

      const photoName = photo.fileName || photo.uri.split('/').pop() || nanoid();
      const photoId = user?.user?.id + '/' + photoName;

      console.log("PHOTO", photoName, photo.mimeType)

      const { data: storedImgs, error: uploadError } = await supabase.storage.from('grade-papers').upload(
        photoId,
        decode(photo.base64 || ''),
        {
          contentType: photo.mimeType
        }
      )

      /*
      const { data: urlData } = await supabase.storage.from('grade-papers').createSignedUrl(
        storedImgs?.path || '',
        60 * 5, // 5 minutes
      )
      */

      const res = await APIFetch.post(
        'grade-paper',
        {
          body: {
            grade: data.grade,
            photos: [
              { type: photo.mimeType, base64: photo.base64 }
            ]
          }
        }
      )

      const { data: sData, error: _errors2 } = await supabase.from('grade-papers').insert({
        grade: data.grade,
        photos: [storedImgs?.fullPath],

        content: res?.content[0]?.text,
        user_id: user?.user?.id
      }).select('id').single();

      return sData?.id;
    }
  })
}

export const useGetAllGradedPapers = () => {
  return useQuery({
    queryKey: ['all-graded-papers'],
    queryFn: async () => {
      const { data, error: _ } = await supabase.from('grade-papers').select('*');
      return data
    },
  })
}

export const useGetGradedPaper = (id: number) => {
  return useQuery({
    queryKey: ['graded-paper', id],
    queryFn: async () => {
      const { data, error: _ } = await supabase.from('grade-papers').select('*').eq('id', id).limit(1).single();
      return data
    },
  })
}
