type HTTPMethod = 'GET';

interface HTTPHeaders {
    [key: string]: string;
}

export interface IRequestConfig {
    url: string;
    method?: HTTPMethod;
    body?: string | null;
    headers?: HTTPHeaders;
}
