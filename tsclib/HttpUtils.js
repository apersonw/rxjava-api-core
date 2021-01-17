"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpUtils {
    /**
     * 发出http请求
     */
    static request(requestParam) {
        let request = HttpUtils.factory();
        request.init(requestParam);
        return request.start();
    }
    /**
     * 设置工厂方法
     */
    static setFactory(factory) {
        HttpUtils.factory = factory;
    }
}
exports.default = HttpUtils;
