/** HTTP 请求方法 */
export declare enum Method {
    /** HTTP 请求 OPTIONS */
    /** HTTP 请求 GET */
    GET = 0,
    /** HTTP 请求 HEAD */
    HEAD = 1,
    /** HTTP 请求 POST */
    POST = 2,
    /** HTTP 请求 PUT */
    PUT = 3,
    /** HTTP 请求 PATCH */
    PATCH = 4,
    /** HTTP 请求 DELETE */
    DELETE = 5,
    /** HTTP 请求 TRACE */
    TRACE = 6,
    /** HTTP 请求 CONNECT */
    CONNECT = 7
}
/**
 * 请求参数对象
 */
export declare type RequestParam = {
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
     * Request参数
     */
    requestParams?: any;
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
declare class AbstractApi {
    _request(requestParam: RequestParam): any;
}
export default AbstractApi;
