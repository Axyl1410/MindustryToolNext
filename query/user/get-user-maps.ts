import {
  PaginationSearchQuery,
  searchSchema,
} from '@/types/data/pageable-search-schema';
import { AxiosInstance } from 'axios';
import { Map } from '@/types/response/Map';

export default async function getUserMaps(
  axios: AxiosInstance,
  userId: string,
  params: PaginationSearchQuery,
): Promise<Map[]> {
  const searchParams = searchSchema.parse(params);
  const result = await axios.get(`/users/${userId}/maps`, {
    params: searchParams,
  });

  return result.data;
}