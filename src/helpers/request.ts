import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const port = window.localStorage.getItem('port');

const env = import.meta.env;

if (env.DEV) {
  axios.defaults.baseURL = `http://localhost:${port}/api`;
} else {
  axios.defaults.baseURL = `http://localhost:${port}/api`;
}

export const createInstance = (config: AxiosRequestConfig): AxiosInstance => {
  axios.defaults.baseURL = `http://localhost:${port}/api`;
  return axios.create(config);
}

export const get = (url: string, config?: AxiosRequestConfig) => {
  const _instance = createInstance(config || {});

  return _instance.get(url, config).then((res: AxiosResponse) => {
    return res;
  });
}

export const post = (url: string, data: any, config?: AxiosRequestConfig) => {
  const _instance = createInstance(config || {});

  return _instance.post(url, data, config).then((res: AxiosResponse) => {
    return res;
  });
}

export const put = (url: string, data: any, config?: AxiosRequestConfig) => {
  const _instance = createInstance(config || {});

  return _instance.put(url, data, config).then((res: AxiosResponse) => {
    return res;
  });
}


export const _delete = (url: string, config?: AxiosRequestConfig) => {
  const _instance = createInstance(config || {});

  return _instance.delete(url, config).then((res: AxiosResponse) => {
    return res;
  });
}

export const request = {
  get,
  post,
  put,
  delete: _delete
}

//@ts-ignore
export const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())
