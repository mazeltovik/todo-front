import axios, { AxiosResponse, isAxiosError } from 'axios';
import { notification } from 'antd';

import { useState } from 'react';

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState(false);
  async function request<B>(method: string, body: B) {
    try {
      setLoading(true);
      let response: AxiosResponse | null = null;
      if (method == 'post') {
        if (body) {
          response = await axios.post<T>(url, body);
        }
        if (response) {
          setData(response?.data);
          notification.open({
            message: 'Success',
            description: 'You have successfully added a task',
            placement: 'bottomRight',
            type: 'success',
            duration: 3,
          });
        }
      }
      if (method == 'put') {
        if (body) {
          response = await axios.put<T>(url, body);
        }
        if (response) {
          setData(response?.data);
          notification.open({
            message: 'Success',
            description: 'You have successfully changed a task',
            placement: 'bottomRight',
            type: 'success',
            duration: 3,
          });
        }
      }
      if (method == 'delete') {
        if (body) {
          response = await axios.delete<T>(url, {
            data: body,
            headers: { Authorization: '***' },
          });
        }
        if (response) {
          setData(response?.data);
          notification.open({
            message: 'Success',
            description: 'You have successfully deleted a task',
            placement: 'bottomRight',
            type: 'success',
            duration: 3,
          });
        }
      }
    } catch (err) {
      if (isAxiosError(err)) {
        const errMsg = err.response?.data?.err as string;
        notification.open({
          message: 'Error',
          description: `${errMsg}`,
          placement: 'bottomRight',
          type: 'error',
          duration: 3,
        });
      }
    } finally {
      setLoading(false);
    }
  }
  return { data, isLoading, request };
}
