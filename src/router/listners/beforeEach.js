/**
 * Хук роутера, вызывается перед переходом на страницу 
 * @param {VueX.Store} store Хранилище приложения
 */
import router from "@/router";
import store from '@/store'
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/localstorage'


export default function() {
    return (to, _, next) => {
        console.log("beforeEach")

    };
};