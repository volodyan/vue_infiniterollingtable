/**
 * 工具类
 */
import secureUtils from './secureUtil'

//加密解密
export function demoRequest(data) {
    var encryptMessage = secureUtils.encryption(data);
    return encryptMessage;
}

export function demoResponse(data) {
    var decryptMessage = secureUtils.decryption(data);
    return decryptMessage;
}
export default {
    demoRequest,
    demoResponse
}