import axios, { AxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";

export const getToken = () => {
  const cookies = new Cookies();
  const token = cookies.get("coaching-token");
  return token;
};
export abstract class HttpService {
  private static initConfig(
    config: AxiosRequestConfig,
    type: string | undefined
  ) {
    const apiHost = "https://api-service-coaching.tatas.id/";

    config.baseURL = apiHost;
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    return config;
  }

  protected static get<DataResponse = any>(
    url: string,
    config: AxiosRequestConfig = {},
    type?: string
  ): Promise<any> {
    const newConfig = this.initConfig(config, type);
    return axios.get(url, newConfig);
  }

  protected static post<DataResponse = any, DataRequest = any>(
    url: string,
    data: DataRequest,
    config: AxiosRequestConfig = {},
    type?: string
  ): Promise<any> {
    const newConfig = this.initConfig(config, type);
    return axios.post(url, data, newConfig);
  }

  protected static patch<DataResponse = any, DataRequest = any>(
    url: string,
    data: DataRequest,
    config: AxiosRequestConfig = {},
    type?: string
  ): Promise<any> {
    const newConfig = this.initConfig(config, type);
    return axios.patch(url, data, newConfig);
  }

  protected static delete<DataResponse = any>(
    url: string,
    body?: any,
    config: AxiosRequestConfig = {},
    type?: string
  ): Promise<any> {
    const newConfig = this.initConfig(config, type);
    if (body) {
      newConfig.data = body;
    }
    return axios.delete(url, newConfig);
  }
}
