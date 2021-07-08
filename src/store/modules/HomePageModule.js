/**
 * VueX模块的例子
 */

import AxiosService from "@/middleware/services/AxiosService";
import VuexModule from "../VuexModule";
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/localstorage'
import moment from "moment";
import Bus from "@/utils/bus";

const HomePageModule = new VuexModule({
    getters: {
        ComponentsData: state => state.ComponentsData,
        GetWaterworksNameData: state => state.GetWaterworksNameData,
        GetTotalWaterFlowData: state => state.GetTotalWaterFlowData,
    },
    state: {
        ComponentsData: "demoComponents",
        GetWaterworksNameData: [],
        GetTotalWaterFlowData: {}
    },
    mutations: {
        set_ComponentsDatafun: (state, data) => state.ComponentsData = data,
        set_GetWaterworksName: (state, data) => state.GetWaterworksNameData = data,
        set_GetTotalWaterFlow: (state, data) => state.GetTotalWaterFlowData = data,
    },

    actions: {
        async ComponentsDatafun({ commit }, data) {
            await commit('set_ComponentsDatafun', data);

        },
        async GetWaterworksName({ commit }) {
            await AxiosService.GetWaterworksName()
                .then(res => {
                    console.log("GetWaterworksName---res", res)
                    commit('set_GetWaterworksName', res.data.WaterworksName);

                })
            return { error: false };

        },
        async GetTotalWaterFlow({ commit }) {
            await AxiosService.GetTotalWaterFlow()
                .then(res => {
                    console.log("GetTotalWaterFlow---res", res)
                    commit('set_GetTotalWaterFlow', res.data);
                    Bus.$emit("GetTotalWaterFlowTo", res.data);
                })
            return { error: false };

        },
    },

});

export default HomePageModule;