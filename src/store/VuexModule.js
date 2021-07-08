/**
 * @typedef {Object} VuexModuleConfig
 * 
 * @property {Function} state 模的初始状态恢复函数
 * @property {Boolean} namespaced 导出模块到命名空间
 * @property {Object} mutations 模块插件
 * @property {Object} actions 模块动作
 * @property {Object} getters 模块计算属性
 */

/**
 * 创建配置Vuex插件
 * @param {VuexModuleConfig} module 模块配置
 */
function VuexModule({ mutations = {}, namespaced = true, state = {}, actions = {}, getters = {} }) {
    this.mutations = {
        ...mutations,
    };
    this.state = {...state };
    this.namespaced = namespaced;
    this.actions = {...actions };
    this.getters = {...getters };

    return true;
}

export default VuexModule;