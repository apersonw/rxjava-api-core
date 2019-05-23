import Request, { RequestParamsType } from './Request';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

const NAMES_PATTERN = /\{([^\}]+?)\}/g;
const SERVICE_PATTERN = /^rxjava-apis-person-(.+)/g;

function encodeValue (value) {
  if (value !== null && typeof (value) != "undefined") {
    let str;
    str = value.toString();
    return encodeURIComponent(str);
  } else {
    return "";
  }
}

function encodeDate(obj, prefix) {
  let str = [], p;
  if (isArray(obj)) {
    obj.forEach(function(v, p) {
      let k = prefix ? prefix + '[' + p + ']' : p;
      if (isObject(v) && (!(v instanceof Date))) {
        str.push(encodeDate(v, k));
      } else {
        str.push(encodeURIComponent(k) + '=' + encodeValue(v));
      }
    });
  } else {
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        let k = prefix ? prefix + '.' + p : p, v = obj[p];
        if (undefined !== v) {
          if (isObject(v) && (!(v instanceof Date))) {
            str.push(encodeDate(v, k));
          } else {
            str.push(encodeURIComponent(k) + '=' + encodeValue(v));
          }
        }
      }
    }
  }
  return str.join('&');
}

class RequestImpl implements Request {
  params: { method: string; serviceId: string; formVars: any; url: string };

  init(params: RequestParamsType): any {
    let { serviceId, method, url, pathVars, formVars } = params;
    if (pathVars) {
      url = url.replace(NAMES_PATTERN, key => {
        return encodeURIComponent(pathVars[key]);
      });
    }
    this.params = { serviceId, method, url, formVars };
  }

  start<T>(): Promise<T> {
    let params = this.params;
    let { serviceId, method, url, formVars } = params;
    return new Promise((resolve, reject) => {
      let servicePath = serviceId.replace(SERVICE_PATTERN, '$1/');
      let requestUrl = servicePath + url + '';
      this.isPostData = (method === 'PUT' || method === 'POST' || method === 'PATCH');
      let reqData = encodeDate(formVars || {});
      if (!this.isPostData && formVars) {
        requestUrl = requestUrl + '?' + reqData;
      }

      const isWithQuery = requestUrl.indexOf('?') > -1;
      const hash = new Date().getTime();
      const urlWithHash = isWithQuery
        ? `${requestUrl}&_hash=${hash}`
        : `${requestUrl}?_hash=${hash}`;
      this.requestTask = Taro.request({
        url: urlWithHash,
        method: method.toUpperCase(),
        data: this.isPostData ? reqData : null,
        dataType: 'text',
        responseType: 'text',
        mode: 'cors',
        // credentials: 'same-origin',
        cache: 'no-cache',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'authorization': Config.token,
          'partner': Config.partner,
          'Accept-Language': 'zh-CN',
          from: localStorage.getItem('_c') || '',
          cid: localStorage.getItem(CURRENT_VIPCARD_ID) || '',
        },
        success: (res) => {
          // console.log("request success:", res, params);
          let data = res.data || null;
          const status = res.statusCode;
          let value = ofValue(data);
          if (!this.isAbort) {
            if (status === 200) {
              resolve(value);
            } else if (status === 401) {
              //需要登录
              console.log('需要登录', !!RequestImpi.login);
              if (RequestImpi.login) {
                RequestImpi.login((b) => {
                  if (b) {
                    console.log('登录成功后重试！', this.params);
                    this.start().then((r) => {
                      resolve(r);
                    }).catch((e) => {
                      reject(e);
                    });
                  } else {
                    console.log('登录失败！', this.params);
                    reject({ value, status });
                  }
                });
              } else {
                reject({ value, status });
              }
            } else {
              reject({ value, status });
            }
          }
        },
        fail: (res) => {
          console.log('request fail:', res, params);
          if (!this.isAbort) {
            reject({
              data: {
                url: url,
                _res: res,
                _params: this.params,
                _isPostData: this._isPostData,
                message: '网络请求错误！' + (res.errorMessage || ''),
              },
              status: CLIENT_ERROR,
            });
          }
        },
        complete: () => {
          // console.log("request complete");
          this.dispatchEvent('loadend');
        },
      });
    });
  };
}
}

export default RequestImpl;