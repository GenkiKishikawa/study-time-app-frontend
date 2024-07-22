import api from './api';

export const getRecords = (page: number) => {
  return api.get(`/records?page=${page}`);
};

export const postRecord = (params: any) => {
  return api.post('/records', params);
};

export const deleteRecord = (id: number) => {
  return api.delete(`/records/${id}`);
}

export const putRecord = (id: number, params: any) => {
  return api.put(`/records/${id}`, params);
}

export const getMonthlyTime = () => {
  return api.get('/monthly_time');
}