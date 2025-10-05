import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

type PingResponse = {
  message: string;
  timestamp: string;
};

export const usePing = () => {
  return useQuery({
    queryKey: ['ping'],
    queryFn: async () => {
      const { data } = await apiClient.get<PingResponse>('/api/ping');
      return data;
    },
    staleTime: 30_000,
    retry: false
  });
};
