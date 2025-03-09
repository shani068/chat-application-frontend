import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const usePostRequest = <TData = unknown, TVariables = unknown>(
  API_URL: string
) => {
  const mutation = useMutation<TData, Error, TVariables>({
    mutationFn: async (formData: TVariables) => {
      const response = await axios.post<TData>(API_URL, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    },
  });

  return mutation;
};