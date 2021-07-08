/**
 * 存储库插件
 */

import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

/**
 * 初始状态
 *
 */


const vuex = new Vuex.Store({
    state: {},
    mutations: {
        // Общие мутации
    },
    actions: {
        // Общие экшены
    },
    getters: {
        // Общие геттеры
    },
    modules,
});

export default vuex;