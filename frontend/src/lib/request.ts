import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosInstance,
  HttpStatusCode,
} from "axios";
import qs from "qs";

interface Response<T = any> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error?: {
    status: HttpStatusCode;
    name: string;
    message: string;
    details?: Record<string, any>;
  };
}

/** axios 请求公共配置项 */
interface AxiosRequestCommonConfig<D = any> extends AxiosRequestConfig<D> {
  /** 开启 debug */
  debug?: boolean;
}

/** axios GET 请求配置项，Get 请求时，将泛型 D 覆盖给 params */
interface AxiosRequestGetConfig<D = any> extends AxiosRequestCommonConfig<D> {
  params?: D;
  data?: any;
}

/** axios POST 请求配置项 */
interface AxiosRequestPostConfig<D = any> extends AxiosRequestCommonConfig<D> {}

class HttpRequest {
  service: AxiosInstance;

  constructor() {
    this.service = axios.create({
      baseURL: process.env.NEXT_PUBLIC_STRAPI_BASE_URL,
      timeout: 10000,
    });

    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.headers[
          "Authorization"
        ] = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_PUBLIC_API_TOKEN}`;

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
      {
        synchronous: true,
        runWhen: (_: InternalAxiosRequestConfig) => true,
      }
    );

    this.service.interceptors.response.use(
      (response: AxiosResponse<Response>): AxiosResponse["data"] => {
        const { config, data } = response;

        if ((config as AxiosRequestGetConfig | AxiosRequestPostConfig).debug) {
          console.log("start response");
          console.log(data);
          console.log("end response");
        }

        return Promise.resolve(data);
      },
      (error: AxiosError<Response>) => {
        if (error.code === "ECONNABORTED") {
          error.message = "请求超时";

          return Promise.reject(error);
        }

        return Promise.reject(error.response?.data.error);
      }
    );
  }

  request<ResponseDTO = any, RequestDTO = any>(
    config: AxiosRequestConfig<RequestDTO>
  ): Promise<Response<ResponseDTO>> {
    return new Promise((resolve, reject) => {
      try {
        this.service
          .request<Response<ResponseDTO>>(config)
          .then((res: AxiosResponse["data"]) => {
            resolve(res as Response<ResponseDTO>);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (err) {
        return Promise.reject(err);
      }
    });
  }

  get<ResponseDTO = any, RequestDTO = any>(
    url: string,
    config?: AxiosRequestGetConfig<RequestDTO>
  ): Promise<Response<ResponseDTO>> {
    const { params, ...restConfig } = config || {};

    return this.request({
      method: "GET",
      url,
      params: {
        ...params,
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: "brackets" });
      },
      ...restConfig,
    });
  }

  post<ResponseDTO = any, RequestDTO = any>(
    url: string,
    config?: AxiosRequestPostConfig<RequestDTO>
  ): Promise<Response<ResponseDTO>> {
    const { data, ...restConfig } = config || {};

    return this.request({
      method: "POST",
      url,
      data: {
        ...data,
      },
      ...restConfig,
    });
  }
}

const request = new HttpRequest();

export default request;
