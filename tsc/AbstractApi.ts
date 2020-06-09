import HttpUtils from './HttpUtils';

/** HTTP 请求方法 */
enum Method {
    /** HTTP 请求 OPTIONS */
    /** HTTP 请求 GET */
    GET,
    /** HTTP 请求 HEAD */
    HEAD,
    /** HTTP 请求 POST */
    POST,
    /** HTTP 请求 PUT */
    PUT,
    /** HTTP 请求 PATCH */
    PATCH,
    /** HTTP 请求 DELETE */
    DELETE,
    /** HTTP 请求 TRACE */
    TRACE,
    /** HTTP 请求 CONNECT */
    CONNECT,
}

/**
 * 请求参数对象
 */
export type RequestParam = {
    /**
     * 服务名
     */
    serviceName: string;
    /**
     * 请求方法，如GET，POST
     */
    method: Method;
    /**
     * 请求路径
     */
    path: string;
    /**
     * 路径参数
     */
    pathParams?: any;
    /**
     * Body参数
     */
    urlParams?: any;
    /**
     * Body参数
     */
    bodyParams?: any;
    /**
     * body数据类型
     */
    dataType?: any;
    /**
     * 响应数据类型
     */
    responseType?: any;
    /**
     * 请求头
     */
    headers?: any;
};

class AbstractApi {
    _request(requestParam: RequestParam) {
        return HttpUtils.request(requestParam);
    }
}

export default AbstractApi;
