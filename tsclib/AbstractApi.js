"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Method = void 0;
const HttpUtils_1 = require("./HttpUtils");
/** HTTP 请求方法 */
var Method;
(function (Method) {
    /** HTTP 请求 OPTIONS */
    /** HTTP 请求 GET */
    Method[Method["GET"] = 0] = "GET";
    /** HTTP 请求 HEAD */
    Method[Method["HEAD"] = 1] = "HEAD";
    /** HTTP 请求 POST */
    Method[Method["POST"] = 2] = "POST";
    /** HTTP 请求 PUT */
    Method[Method["PUT"] = 3] = "PUT";
    /** HTTP 请求 PATCH */
    Method[Method["PATCH"] = 4] = "PATCH";
    /** HTTP 请求 DELETE */
    Method[Method["DELETE"] = 5] = "DELETE";
    /** HTTP 请求 TRACE */
    Method[Method["TRACE"] = 6] = "TRACE";
    /** HTTP 请求 CONNECT */
    Method[Method["CONNECT"] = 7] = "CONNECT";
})(Method = exports.Method || (exports.Method = {}));
class AbstractApi {
    _request(requestParam) {
        return HttpUtils_1.default.request(requestParam);
    }
}
exports.default = AbstractApi;
