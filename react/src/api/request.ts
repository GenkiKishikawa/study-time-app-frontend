import api from './api';

export const getRecords = () => {
  return api.get('/records');
};

export const postRecord = (params: any) => {
  return api.post('/records', params);
};

export const deleteRecord = (id: number) => {
  return api.delete(`/records/${id}`);
}