import api from './api';
import Cookies from 'js-cookie';

export const getRecords = (page: number, order: string) => {
  return api.get(`/records?page=${page}&order=${order}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
};

export const postRecord = (params: any) => {
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

export const putRecord = (recordId: number, params: any) => {
  return api.put(`/records/${recordId}`, params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
}

export const getMonthlyTime = (year: any, month: any) => {
  return api.get(`/monthly_times?year=${year}&month=${month}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
}

export const getDailyTime = (year: any, month: any, day: any) => {
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

export const postCategory = (params: any) => {
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

export const putUser = (params: any) => {
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