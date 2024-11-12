import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://api-service-coaching.tatas.id/";

export abstract class HttpService {
  private static initConfig(
    config: AxiosRequestConfig,
    type: string | undefined
  ) {
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    config.withCredentials = true;

    return config;
  }

  private static async handleRequest<T>(
    requestFn: () => Promise<T>
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        // Token is invalid or expired
      }
      throw error;
    }
  }

  protected static get<DataResponse = any>(
    url: string,
    config: AxiosRequestConfig = {},
    type?: string
  ): Promise<any> {
    return this.handleRequest(async () => {
      const newConfig = this.initConfig(config, type);
      return axios.get(url, {
        ...newConfig,
        withCredentials: true,
      });
    });
  }

  protected static post<DataResponse = any, DataRequest = any>(
    url: string,
    data: DataRequest,
    config: AxiosRequestConfig = {},
    type?: string
  ): Promise<any> {
    return this.handleRequest(async () => {
      const newConfig = this.initConfig(config, type);
      return axios.post(url, data, { ...newConfig, withCredentials: true });
    });
  }

  protected static patch<DataResponse = any, DataRequest = any>(
    url: string,
    data: DataRequest,
    config: AxiosRequestConfig = {},
    type?: string
  ): Promise<any> {
    return this.handleRequest(async () => {
      const newConfig = this.initConfig(config, type);
      return axios.patch(url, data, { ...newConfig, withCredentials: true });
    });
  }

  protected static delete<DataResponse = any>(
    url: string,
    body?: any,
    config: AxiosRequestConfig = {},
    type?: string
  ): Promise<any> {
    return this.handleRequest(async () => {
      const newConfig = this.initConfig(config, type);
      if (body) {
        newConfig.data = body;
      }
      return axios.delete(url, { ...newConfig, withCredentials: true });
    });
  }
}

export abstract class HttpServiceContent {
  private static initConfig(
    config: AxiosRequestConfig,
    type: string | undefined
  ) {
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    config.withCredentials = true;

    return config;
  }

  private static async handleRequest<T>(
    requestFn: () => Promise<T>
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        // Token is invalid or expired
      }
      throw error;
    }
  }
  protected static postFormData<DataResponse = any, DataRequest = any>(
    url: string,
    data: DataRequest,
    config: AxiosRequestConfig = {},
    type?: string
  ): Promise<any> {
    console.log("HttpServiceContent Data:", data);
    return this.handleRequest(async () => {
      const newConfig = this.initConfig(config, type);
      return axios.post(url, data, {
        ...newConfig,
        headers: { "Content-Type": "multipart/form-data" },
      });
    });
  }
}
