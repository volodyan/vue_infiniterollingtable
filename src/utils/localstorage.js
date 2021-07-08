// //用中文 记得加encodeURIComponent()!

// localStorage.setItem("obj",window.btoa(window.encodeURIComponent(JSON.stringify(obj))));

//用中文 记得加decodeURIComponent()!

// var obj=JSON.parse(decodeURIComponent(window.atob(localStorage.getItem("obj"))));

// console.info(obj);

export function getLocalStorage(getdata) {
    //return JSON.parse(decodeURIComponent(window.atob(localStorage.getItem(getdata))));
    return JSON.parse(localStorage.getItem(getdata));

}

export function setLocalStorage(saveaLabel, savedata) {
    //return localStorage.setItem(saveaLabel, window.btoa(window.encodeURIComponent(JSON.stringify(savedata))));
    return localStorage.setItem(saveaLabel, JSON.stringify(savedata));
}

export function removeLocalStorage(removedata) {
    return localStorage.removeItem(removedata)
}