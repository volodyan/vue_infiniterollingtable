/**
 * VueX模块的例子
 */

import AxiosService from "@/middleware/services/AxiosService";
import VuexModule from "../VuexModule";
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/localstorage'
import moment from "moment";
import Bus from "@/utils/bus";

const ExampleModule = new VuexModule({
    getters: {
        GetWaterworksData: state => state.GetWaterworksData,
        dispatchTime: state => state.dispatchTime,
        BengTableData: state => state.BengTableData,
        GetDispatchTimeData: state => state.GetDispatchTimeData,
        GetTotalWaterFlowData: state => state.GetTotalWaterFlowData,
        tabsComponentsData: state => state.tabsComponentsData,
        ComponentsData: state => state.ComponentsData,
        GetWaterworksNameData: state => state.GetWaterworksNameData,
        GetPressurePointData: state => state.GetPressurePointData,
        GetGetDispatchOrderList: state => state.GetDispatchOrderList,
        GetGetDispatchOrderDetail: state => state.GetDispatchOrderDetail,
        GetGetDefaultDataForSimulatieAnalysis: state => state.GetDefaultDataForSimulatieAnalysis,
        GetCtlPressureData: state => state.GetCtlPressureData,
        GetPressurePointForSimulateAnalysis: state => state.GetPressurePointForSimulateAnalysis,
        ComponentsDatafun_Tabsrooms: state => state.ComponentsDatafun_Tabsrooms
    },
    state: {
        GetWaterworksData: {},
        dispatchTime: "",
        BengTableData: {},
        GetDispatchTimeData: {},
        GetTotalWaterFlowData: {},
        tabsComponentsData: "waterflow",
        GetWaterworksNameData: [],
        GetPressurePointData: [],
        GetDispatchOrderList: [],
        GetDispatchOrderDetail: [],
        GetDefaultDataForSimulatieAnalysis: [],
        ComponentsData: [ /* "controlpresure", "totalwater" */ ],
        GetCtlPressureData: [],
        GetPressurePointForSimulateAnalysis: [],
        ComponentsDatafun_Tabsrooms: []
    },
    mutations: {
        set_GetWaterworks: (state, res) => state.GetWaterworksData = res,
        set_dispatchTime: (state, res) => state.dispatchTime = res,
        set_BengTable: (state, data) => state.BengTableData = data,
        set_GetDispatchTime: (state, data) => state.GetDispatchTimeData = data,
        set_GetTotalWaterFlow: (state, data) => state.GetTotalWaterFlowData = data,
        set_tabsComponents: (state, data) => state.tabsComponentsData = data,
        set_ComponentsDatafun: (state, data) => state.ComponentsData = data,
        set_ComponentsDatafun_Tabsrooms: (state, data) => {
            const tableData = [{
                    index: 0,
                    name: "控制点压力",
                    componentsName: "controlpresure",
                },
                {
                    index: 1,
                    name: "总水量预测曲线",
                    componentsName: "totalwater",
                },
                {
                    index: 2,
                    name: "时水量预测曲线",
                    componentsName: "totalwater",
                },
                {
                    index: 3,
                    name: "水厂水量",
                    componentsName: "waterflow",
                },
                {
                    index: 4,
                    name: "出厂压力",
                    componentsName: "outpresure",
                },
                {
                    index: 5,
                    name: "水厂清水池水位",
                    componentsName: "claerlevel",
                },
                {
                    index: 6,
                    name: "水厂供水单耗",
                    componentsName: "power",
                },
                {
                    index: 7,
                    name: "水厂供水总效率",
                    componentsName: "efficiency",
                },
                {
                    index: 8,
                    name: "水泵状态",
                    componentsName: "bengstatus",
                },
            ]
            let Tabsrooms = tableData.filter(item => data.indexOf(item.componentsName) > -1)
            console.log('Tabsrooms', Tabsrooms)
            return state.ComponentsDatafun_Tabsrooms = Tabsrooms
        },
        set_GetWaterworksName: (state, data) => state.GetWaterworksNameData = data,
        set_GetPressurePoint: (state, data) => state.GetPressurePointData = data,
        set_GetDispatchOrderList: (state, data) => state.GetDispatchOrderList = data,
        set_GetDispatchOrderDetail: (state, data) => state.GetDispatchOrderDetail = data,
        set_GetDefaultDataForSimulatieAnalysis: (state, data) => state.GetDefaultDataForSimulatieAnalysis = data,
        set_ResetModifyTypefun: (state, data) => {
            console.log("data, Type", data)
            return state.GetDefaultDataForSimulatieAnalysis.ForecastWaterworksInfoArray.forEach((ele, i) => {
                if (data.index === i) {
                    if (data.Type === "水泵") {
                        ele.ModifyType = 3 + ""
                    } else if (data.Type === 1 || data.Type === 2) {
                        ele.ModifyType = data.Type + ""
                    }


                }
            })
        },
        //set_GetCtlPressureData: (state, data) => state.GetCtlPressureData = data,
        set_GetPressurePointForSimulateAnalysis: (state, data) => state.GetPressurePointForSimulateAnalysis = data,
        //set_ResetModifyTypefunData: (state, data, Type) => state.ResetModifyTypefunData
        set_AddRowTotableFun: (state, res) => {
            let CodeIdArray = []
            state.GetCtlPressureData.map(ele => {
                CodeIdArray.push(ele.CodeId)
            })
            if (CodeIdArray.includes(res.CodeId)) {
                return
            } else {
                return state.GetCtlPressureData.push(res)
            }

        },
        set_DeletRowtableFun: (state, res) => {
            // let arr1 = [{ id: 1, name: '网' }, { id: 2, name: '二位' }]
            // let arr2 = [{ id: 1, name: '问问' }, { id: 3, name: '多少' }, { id: 44, name: '多少' }, { id: 45, name: '多少' }, ]

            // let add = arr2.filter(item => !arr1.some(ele => ele.id === item.id))
            // console.log(add)
            return state.GetCtlPressureData = state.GetCtlPressureData.filter(item => !res.some(ele => ele.CodeId === item.CodeId))
        },
        set_DeletRowtableFun_disabled: (state, res) => {
            // console.log("newdata1.concat(newdata2)---res", res)
            let newdata1 = state.GetPressurePointForSimulateAnalysis.filter(item => !res.some(ele => ele.CodeId === item.CodeId))
            let newdata2 = JSON.parse(JSON.stringify(res))
            newdata2.forEach(ele => {
                    ele.disabled = false
                })
                // console.log("newdata1", newdata1)
                // console.log("newdata2", newdata2)
                // console.log("newdata1.concat(newdata2)", [newdata1, newdata2].flat())
            return state.GetPressurePointForSimulateAnalysis = [newdata1, newdata2].flat()
        },
        set_GetPressurePointForSimulateAnalysis_disabled: (state, res) => {

            return state.GetPressurePointForSimulateAnalysis.forEach(item => {
                if (res.CodeId === item.CodeId) {
                    item.disabled = true
                }
            })
        },
    },

    actions: {
        async login({ commit }, userInfo) {
            const { username, password } = userInfo
            await AxiosService.login({ username: username.trim(), password })
                .then(res => {
                    console.log("res", res)
                    setLocalStorage("UserToken", res.data.token)
                    setLocalStorage("TokenStatus", res.data.TokenStatus)
                    commit('set_userInfo', res.data);
                    commit('set_RoutesInfos', res.data.RoutesInfos);
                })
            return { error: false };

        },
        async GetWaterworks({ commit }) {
            await AxiosService.GetWaterworks()
                .then(res => {
                    console.log("GetWaterworks----res", res)
                        //当前数据处理
                    let CurrentWaterworksInfoArray = [];
                    let CurrentWaterworksBengListArray = [];
                    res.data.CurrentData.map((ele, index) => {
                        CurrentWaterworksInfoArray.push({
                            // data: {
                            //     name: "当前",
                            //     ClearWaterLevel: ele.ClearWaterLevel,
                            //     OutFlow: ele.OutFlow,
                            //     OutPressure: ele.OutPressure,

                            // },
                            data: ["当前", ele.OutPressure, ele.OutFlow, ele.ClearWaterLevel, ele.ControlPressure],
                            WaterworksType: ele.WaterworksType,
                            out_is_correct_Warning: ele.out_is_correct_Warning
                        });
                        CurrentWaterworksBengListArray.push({ PumpList: ele.PumpList });
                    });
                    //调度数据处理
                    let ForecastWaterworksNameArray = [];
                    let ForecastWaterworksInfoArray = [];
                    let ForecastWaterworksBengListArray = [];
                    let beng_LengthArray = []
                    res.data.ForecastData.map((ele, index) => {
                        ForecastWaterworksNameArray.push({
                            WaterworksName: ele.WaterworksName,
                            WaterworksType: ele.WaterworksType,
                            //out_is_correct_Warning: ele.out_is_correct_Warning
                        });
                        ForecastWaterworksInfoArray.push({
                            // data: {
                            //     ClearWaterLevel: ele.ClearWaterLevel,
                            //     OutFlow: ele.OutFlow,
                            //     OutPressure: ele.OutPressure,
                            //     name: "调度"
                            // },
                            data: ["调度", ele.OutPressure, ele.OutFlow, ele.ClearWaterLevel, ele.ControlPressure],
                            WaterworksType: ele.WaterworksType,
                            // out_is_correct_Warning: ele.out_is_correct_Warning
                        });
                        ForecastWaterworksBengListArray.push({ PumpList: ele.PumpList });
                        beng_LengthArray.push(ele.PumpList.length) //获取泵个数集合

                    });
                    //找出最大泵个数
                    beng_LengthArray.sort((a, b) => {
                        return b - a
                    })

                    let beng_TitleArray = new Array(beng_LengthArray[0]).fill("")
                    console.log("beng_TitleArray", beng_TitleArray)
                    commit('set_GetWaterworks', res.data);
                    commit('set_dispatchTime', res.data.Time);
                    commit('set_BengTable', {
                        CurrentWaterworksInfoArray,
                        CurrentWaterworksBengListArray,
                        ForecastWaterworksNameArray,
                        ForecastWaterworksInfoArray,
                        ForecastWaterworksBengListArray,
                        beng_TitleArray
                    });

                })
            return { error: false };

        },
        async action_dispatchTime({ commit }, data) {
            console.log("action_dispatchTime---res", data)
            await commit('set_dispatchTime', data);
            await AxiosService.GetDispatchData({ Time: data })
                .then(res => {
                    console.log("GetDispatchData---res", res)
                        //当前数据处理
                    let CurrentWaterworksInfoArray = [];
                    let CurrentWaterworksBengListArray = [];
                    res.data.CurrentData.map((ele, index) => {
                        CurrentWaterworksInfoArray.push({
                            // data: {
                            //     name: "当前",
                            //     ClearWaterLevel: ele.ClearWaterLevel,
                            //     OutFlow: ele.OutFlow,
                            //     OutPressure: ele.OutPressure,

                            // },
                            data: ["当前", ele.OutPressure, ele.OutFlow, ele.ClearWaterLevel, ele.ControlPressure],
                            WaterworksType: ele.WaterworksType,
                            out_is_correct_Warning: ele.out_is_correct_Warning
                        });
                        CurrentWaterworksBengListArray.push({ PumpList: ele.PumpList });
                    });
                    //调度数据处理
                    let ForecastWaterworksNameArray = [];
                    let ForecastWaterworksInfoArray = [];
                    let ForecastWaterworksBengListArray = [];
                    let beng_LengthArray = []
                    res.data.ForecastData.map((ele, index) => {
                        ForecastWaterworksNameArray.push({
                            WaterworksName: ele.WaterworksName,
                            WaterworksType: ele.WaterworksType,
                            //out_is_correct_Warning: ele.out_is_correct_Warning
                        });
                        ForecastWaterworksInfoArray.push({
                            // data: {
                            //     ClearWaterLevel: ele.ClearWaterLevel,
                            //     OutFlow: ele.OutFlow,
                            //     OutPressure: ele.OutPressure,
                            //     name: "调度"
                            // },
                            data: ["调度", ele.OutPressure, ele.OutFlow, ele.ClearWaterLevel, ele.ControlPressure],
                            WaterworksType: ele.WaterworksType,
                            // out_is_correct_Warning: ele.out_is_correct_Warning
                        });
                        ForecastWaterworksBengListArray.push({ PumpList: ele.PumpList });
                        beng_LengthArray.push(ele.PumpList.length) //获取泵个数集合

                    });
                    //找出最大泵个数
                    beng_LengthArray.sort((a, b) => {
                        return b - a
                    })

                    let beng_TitleArray = new Array(beng_LengthArray[0]).fill("")
                    console.log("beng_TitleArray", beng_TitleArray)
                    commit('set_GetWaterworks', res.data);
                    commit('set_BengTable', {
                        CurrentWaterworksInfoArray,
                        CurrentWaterworksBengListArray,
                        ForecastWaterworksNameArray,
                        ForecastWaterworksInfoArray,
                        ForecastWaterworksBengListArray,
                        beng_TitleArray
                    });

                })
            return { error: false };

        },
        async GetTotalFlowTrendData({ commit }) {
            await AxiosService.GetTotalFlowTrendData()
                .then(res => {
                    console.log("GetTotalFlowTrendData---res", res)
                    Bus.$emit("GetTotalFlowTrendDataTo", res.data)
                })
            return { error: false };

        },
        async GetDispatchTime({ commit }) {
            await AxiosService.GetDispatchTime()
                .then(res => {
                    console.log("GetDispatchTime---res", res)
                    commit('set_GetDispatchTime', res.data);
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
        async Actiontabfun({ commit }, data) {
            let tabsComponents = ["waterflow", "outpresure", "claerlevel", "power", "efficiency", "bengstatus"]
            await commit('set_tabsComponents', tabsComponents[data]);
            // await AxiosService.GetTotalWaterFlow()
            //     .then(res => {
            //         console.log("GetTotalWaterFlow---res", res)
            //         commit('set_GetTotalWaterFlow', res.data);
            //         Bus.$emit("GetTotalWaterFlowTo", res.data);
            //     })
            return { error: false };

        },
        async GetWaterworksName({ commit }) {
            await AxiosService.GetWaterworksName()
                .then(res => {
                    console.log("GetWaterworksName---res", res)
                    commit('set_GetWaterworksName', res.data.WaterworksName);

                })
            return { error: false };

        },
        async GetPressurePoint({ commit }) {
            await AxiosService.GetPressurePoint()
                .then(res => {
                    console.log("GetPressurePoint---res", res)
                    let cloneresData = res.data.PressurePointList
                    let newPressurePointList = []
                    cloneresData.map((ele, index) => {
                        ele.SelectedStatus =
                            ele.RowIndex = index
                        newPressurePointList.push(ele)
                    })
                    console.log("newPressurePointList---res", newPressurePointList)
                    commit('set_GetPressurePoint', newPressurePointList);
                    Bus.$emit("GetPressurePointTo", newPressurePointList);
                })
            return { error: false };

        },
        async GetDispatchOrderList({ commit }) {
            await AxiosService.GetDispatchOrderList()
                .then(res => {
                    console.log("GetDispatchOrderList---res", res)
                    commit('set_GetDispatchOrderList', res.data.Data);
                })
            return { error: false };

        },
        async DeletetDispatchOrderData({ commit }, data) {
            await AxiosService.DeletetDispatchOrderData({ DispatchOrderID: data })
                .then(res => {
                    console.log("DeletetDispatchOrderData---res", res)
                        // commit('set_DeletetDispatchOrderData', res.data.Data);
                })
            return { error: false };

        },
        async IssueDispatchOrder({ commit }, data) {
            await AxiosService.IssueDispatchOrder({ DispatchOrderID: data })
                .then(res => {
                    console.log("IssueDispatchOrder---res", res)

                    // commit('set_IssueDispatchOrder', res.data.Data);
                })
            return { error: false };

        },
        async GetDispatchOrderDetail({ commit }, data) {
            await AxiosService.GetDispatchOrderDetail({ DispatchOrderID: data })
                .then(res => {
                    console.log("GetDispatchOrderDetail---res", res)

                    commit('set_GetDispatchOrderDetail', res.data.Data);
                })
            return { error: false };

        },
        async GetDefaultDataForSimulatieAnalysis({ commit }, data) {
            await AxiosService.GetDefaultDataForSimulatieAnalysis(data)
                .then(res => {
                    console.log("GetDefaultDataForSimulatieAnalysis---res", res)
                        /*  */
                    let RESData = JSON.parse(JSON.stringify(res.data))
                    RESData.CurrentData.forEach((ele) => {
                        ele.ModifyType = "1"
                        ele.IsModify = "0"
                        ele.Power = 32
                        ele.ControlPressure = 0.61
                    })
                    RESData.ForecastData.forEach((ele) => {
                        ele.ModifyType = "1"
                        ele.IsModify = "0"
                        ele.Power = 32
                        ele.ControlPressure = 0.61
                    })
                    console.log("RESData", RESData)
                    console.log("RESData", JSON.stringify(RESData))
                        /*  */
                        //当前数据处理
                    let CurrentWaterworksInfoArray = [];
                    let CurrentWaterworksBengListArray = [];
                    res.data.CurrentData.map((ele, index) => {
                        CurrentWaterworksInfoArray.push({
                            // data: {
                            //     name: "当前",
                            //     ClearWaterLevel: ele.ClearWaterLevel,
                            //     OutFlow: ele.OutFlow,
                            //     OutPressure: ele.OutPressure,

                            // },
                            data: ["当前", ele.OutPressure, ele.OutFlow, ele.ClearWaterLevel, ele.Power, ele.ControlPressure],
                            WaterworksType: ele.WaterworksType,
                            out_is_correct_Warning: ele.out_is_correct_Warning,
                            ModifyType: ele.ModifyType,
                            IsModify: ele.IsModify
                        });
                        CurrentWaterworksBengListArray.push({ PumpList: ele.PumpList });
                    });
                    //调度数据处理
                    let ForecastWaterworksNameArray = [];
                    let ForecastWaterworksInfoArray = [];
                    let ForecastWaterworksBengListArray = [];
                    let beng_LengthArray = []
                    res.data.ForecastData.map((ele, index) => {
                        ForecastWaterworksNameArray.push({
                            WaterworksName: ele.WaterworksName,
                            WaterworksType: ele.WaterworksType,
                            //out_is_correct_Warning: ele.out_is_correct_Warning
                        });
                        ForecastWaterworksInfoArray.push({
                            // data: {
                            //     ClearWaterLevel: ele.ClearWaterLevel,
                            //     OutFlow: ele.OutFlow,
                            //     OutPressure: ele.OutPressure,
                            //     name: "调度"
                            // },
                            data: ["调度", ele.OutPressure, ele.OutFlow, ele.ClearWaterLevel, ele.Power, ele.ControlPressure],
                            WaterworksType: ele.WaterworksType,
                            ModifyType: ele.ModifyType,
                            IsModify: ele.IsModify
                                // out_is_correct_Warning: ele.out_is_correct_Warning
                        });
                        ForecastWaterworksBengListArray.push({ PumpList: ele.PumpList });
                        beng_LengthArray.push(ele.PumpList.length) //获取泵个数集合

                    });
                    //找出最大泵个数
                    beng_LengthArray.sort((a, b) => {
                        return b - a
                    })

                    let beng_TitleArray = new Array(beng_LengthArray[0]).fill("")
                        //新加字段

                    let TotalFlow = res.data.TotalFlow
                    let CurrentPower = res.data.CurrentPower
                    let ForecastPower = res.data.ForecastPower
                    commit('set_GetDefaultDataForSimulatieAnalysis', {
                        CurrentWaterworksInfoArray,
                        CurrentWaterworksBengListArray,
                        ForecastWaterworksNameArray,
                        ForecastWaterworksInfoArray,
                        ForecastWaterworksBengListArray,
                        beng_TitleArray,
                        TotalFlow,
                        CurrentPower,
                        ForecastPower
                    });

                })
            return { error: false };

        },

        async ResetModifyTypefun({ commit }, data) {
            await commit('set_ResetModifyTypefun', data);
            // await commit('set_ResetModifyTypefunData', data);
            return { error: false };

        },
        async RESMONIComputedfun({ commit }, data) {

            //当前数据处理
            let CurrentWaterworksInfoArray = [];
            let CurrentWaterworksBengListArray = [];
            data.CurrentData.map((ele, index) => {
                CurrentWaterworksInfoArray.push({
                    // data: {
                    //     name: "当前",
                    //     ClearWaterLevel: ele.ClearWaterLevel,
                    //     OutFlow: ele.OutFlow,
                    //     OutPressure: ele.OutPressure,

                    // },
                    // data: ["调度", ele.OutPressure, ele.OutFlow, ele.ClearWaterLevel, , ele.Power],
                    data: ["当前", ele.OutPressure, ele.OutFlow, ele.ClearWaterLevel, ele.Power, ele.ControlPressure],
                    WaterworksType: ele.WaterworksType,
                    out_is_correct_Warning: ele.out_is_correct_Warning,
                    ModifyType: ele.ModifyType,
                    IsModify: ele.IsModify
                });
                CurrentWaterworksBengListArray.push({ PumpList: ele.PumpList });
            });
            //调度数据处理
            let ForecastWaterworksNameArray = [];
            let ForecastWaterworksInfoArray = [];
            let ForecastWaterworksBengListArray = [];
            let beng_LengthArray = []
            data.ForecastData.map((ele, index) => {
                ForecastWaterworksNameArray.push({
                    WaterworksName: ele.WaterworksName,
                    WaterworksType: ele.WaterworksType,
                    //out_is_correct_Warning: ele.out_is_correct_Warning
                });
                ForecastWaterworksInfoArray.push({
                    // data: {
                    //     ClearWaterLevel: ele.ClearWaterLevel,
                    //     OutFlow: ele.OutFlow,
                    //     OutPressure: ele.OutPressure,
                    //     name: "调度"
                    // },
                    data: ["调度", ele.OutPressure, ele.OutFlow, ele.ClearWaterLevel, ele.Power, ele.ControlPressure],
                    WaterworksType: ele.WaterworksType,
                    ModifyType: ele.ModifyType,
                    IsModify: ele.IsModify
                        // out_is_correct_Warning: ele.out_is_correct_Warning
                });
                ForecastWaterworksBengListArray.push({ PumpList: ele.PumpList });
                beng_LengthArray.push(ele.PumpList.length) //获取泵个数集合

            });
            //找出最大泵个数
            beng_LengthArray.sort((a, b) => {
                return b - a
            })

            let beng_TitleArray = new Array(beng_LengthArray[0]).fill("")
            let TotalFlow = data.TotalFlow
            let CurrentPower = data.CurrentPower
            let ForecastPower = data.ForecastPower
            await commit('set_GetDefaultDataForSimulatieAnalysis', {
                CurrentWaterworksInfoArray,
                CurrentWaterworksBengListArray,
                ForecastWaterworksNameArray,
                ForecastWaterworksInfoArray,
                ForecastWaterworksBengListArray,
                beng_TitleArray,
                TotalFlow,
                CurrentPower,
                ForecastPower
            });

            //await commit('set_GetCtlPressureData', data.CtlPressureData);
            commit('set_GetPressurePointForSimulateAnalysis', data.CtlPressureData);
            return { error: false };

        },
        async ComponentsDatafun({ commit }, data) {
            await commit('set_ComponentsDatafun', data);
            await commit('set_ComponentsDatafun_Tabsrooms', data);
        },
        async GetPressurePointForSimulateAnalysis({ commit }) {
            await AxiosService.GetPressurePointForSimulateAnalysis()
                .then(res => {
                    console.log("GetPressurePointForSimulateAnalysis---res", res)
                        //disabled
                    let NewPressurePointList = JSON.parse(JSON.stringify(res.data.PressurePointList))
                    NewPressurePointList.forEach(ele => {
                        ele.disabled = false
                    })
                    commit('set_GetPressurePointForSimulateAnalysis', res.data.PressurePointList);
                })
            return { error: false };

        },
        async AddRowTotableFun({ commit }, data) {
            await commit('set_AddRowTotableFun', data);
            await commit('set_GetPressurePointForSimulateAnalysis_disabled', data);
            return { error: false };

        },
        async DeletRowtableFun({ commit }, data) {
            await commit('set_DeletRowtableFun', data);
            await commit('set_DeletRowtableFun_disabled', data);
            return { error: false };

        },

    },

});

export default ExampleModule;