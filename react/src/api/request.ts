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