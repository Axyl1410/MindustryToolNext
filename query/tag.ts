import { AllTagGroup } from '@/types/response/TagGroup';

import { AxiosInstance } from 'axios';

export async function getTags(axios: AxiosInstance): Promise<AllTagGroup> {
  const { data } = await axios.get('/tags');
  return data;
}
