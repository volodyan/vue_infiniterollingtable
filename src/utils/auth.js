import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

// //用中文 记得加encodeURIComponent()!
// localStorage.setItem("obj",window.btoa(window.encodeURIComponent(JSON.stringify(obj))));

//用中文 记得加decodeURIComponent()!
// var obj=JSON.parse(decodeURIComponent(window.atob(localStorage.getItem("obj"))));
// console.info(obj);