import { request } from './http.js';

export async function getFeedbacks() {
  const data = await request('/feedbacks', {
    params: {
      limit: 10,
      page: 1,
    },
  });

  return data.feedbacks ?? [];
}
