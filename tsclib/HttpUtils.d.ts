import { RequestParam } from './AbstractApi';
declare class HttpUtils {
    /**
     * 工厂函数
     */
    static factory: any;
    /**
     * 发出http请求
     */
    static request(requestParam: RequestParam): any;
    /**
     * 设置工厂方法
     */
    static setFactory(factory: any): void;
}
export default HttpUtils;
