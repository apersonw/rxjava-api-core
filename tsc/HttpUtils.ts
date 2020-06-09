import { RequestParam } from './AbstractApi';

class HttpUtils {
    /**
     * 工厂函数
     */
    static factory;

    /**
     * 发出http请求
     */
    static request(requestParam: RequestParam) {
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

export default HttpUtils;
