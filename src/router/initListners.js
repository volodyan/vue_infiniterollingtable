/**
 * Инициализация слушателей событий роутера
 * 
 * @param {Router} router Роутер приложения
 * @param  {...any} listners Слушатели
 */
import router from "@/router";
import store from '@/store'
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/localstorage'


export default function initListners(router, ...listners) {
    // return store => {
    //     listners.flat().map(listner => {
    //         // router[listner.type](listner.listner(store));
    //     });

    //     return router;
    // };

    // listners.flat().map(listner => {
    //     // console.log("router[listner.type]", router[listner.type](listner.listner("store")))
    //     if (listner.type == 'beforeEach') {
    //         //console.log("listner", listner)
    //         router[listner.type](listner.listner());
    //     }

    // });
    return router;
};