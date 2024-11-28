import { APIFetch } from "@/lib/api-fetch"
import { supabase } from "@/lib/supabase"
import { decode } from 'base64-arraybuffer';
import { useMutation, useQuery } from "@tanstack/react-query"
import { useActiveUser } from "../auth"
import { ImagePickerAsset } from "expo-image-picker";
import { nanoid } from "nanoid";

export type UseLevellerReturn = number

export const useLevelAssignment = () => {
  const { data: user } = useActiveUser()

  return useMutation({
    mutationFn: async (data: { grade: number, description: string, photos: ImagePickerAsset[] }): Promise<UseLevellerReturn> => {
      const photo = data.photos[0];

      const photoName = photo.fileName || photo.uri.split('/').pop() || nanoid();
      const photoId = user?.user?.id + '/' + photoName;

      console.log("PHOTO", photoName, photo.mimeType)

      const { data: storedImgs, error: uploadError } = await supabase.storage.from('leveller').upload(
        photoId,
        decode(photo.base64 || ''),
        {
          contentType: photo.mimeType
        }
      )

      const { data: urlData } = supabase.storage.from('leveller').getPublicUrl(storedImgs?.path || '')

      const res = await APIFetch.post(
        'leveller',
        {
          body: {
            grade: data.grade,
            description: data.description,
            photos: [
              { type: photo.mimeType, base64: photo.base64 }
            ]
          }
        }
      )

      const { data: sData, error: _errors2 } = await supabase.from('leveller').insert({
        grade: data.grade,
        description: data.description,
        photos: [urlData.publicUrl],

        content: res?.content[0]?.text,
        user_id: user?.user?.id
      }).select('id').single();

      return sData?.id;
    }
  })
}

export const useGetAllLevelledAssignments = () => {
  return useQuery({
    queryKey: ['all-levelled-assignments'],
    queryFn: async () => {
      const { data, error: _ } = await supabase.from('leveller').select('*');
      return data
    },
  })
}

export const useGetLevelledAssignment = (id: number) => {
  return useQuery({
    queryKey: ['levelled-assignment', id],
    queryFn: async () => {
      const { data, error: _ } = await supabase.from('leveller').select('*').eq('id', id).limit(1).single();
      return data
    },
  })
}

