import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
export const usePing = () => {
    return useQuery({
        queryKey: ['ping'],
        queryFn: async () => {
            const { data } = await apiClient.get('/api/ping');
            return data;
        },
        staleTime: 30000
    });
};
