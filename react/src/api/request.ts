import api from './api';
import Cookies from 'js-cookie';

export type GetRecordsQuery = {
  page: number;
  order: "asc" | "desc";
}

export type PostRecordParams = {
  studyMinutes: number;
  startDatetime: Date;
  endDatetime: Date;
  mdValue: string | null;
  categoryId: number;
}

export type PutRecordParams = {
  studyMinutes?: number;
  startDatetime?: Date;
  endDatetime?: Date;
  mdValue?: string;
  categoryId?: number;
  memo?: string;
}

export type GetMonthlyTimeQuery = {
  year: number;
  month: number;
}

export type GetDailyTimeQuery = {
  year: number;
  month: number;
  day: number;
}

export type PostCategoryParams = {
  name: string;
  color: string;
}

export type PutUserParams = {
  image: File | null;
}

export const getRecords = ({ page, order }: GetRecordsQuery) => {
  return api.get(`/records?page=${page}&order=${order}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
};

export const postRecord = (params: PostRecordParams) => {
  return api.post('/records', params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
};

export const deleteRecord = (id: number) => {
  return api.delete(`/records/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
}

export const putRecord = (recordId: number, params: PutRecordParams) => {
  return api.put(`/records/${recordId}`, params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
}

export const getMonthlyTime = ({ year, month }: GetMonthlyTimeQuery) => {
  return api.get(`/monthly_times?year=${year}&month=${month}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
}

export const getDailyTime = ({ year, month, day }: GetDailyTimeQuery) => {
  return api.get(`/daily_times?year=${year}&month=${month}&day=${day}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
}

export const getCategories = () => {
  return api.get('/categories', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
}

export const postCategory = (params: PostCategoryParams) => {
  return api.post('/categories', params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
}

export const deleteCategory = (id: number) => {
  return api.delete(`/categories/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
}

export const getCategory = (id: number) => {
  return api.get(`/categories/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
}

export const putUser = (params: PutUserParams) => {
  return api.put(`/users/upload_image`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
}

export const getUser = () => {
  return api.get('/users/show', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
}