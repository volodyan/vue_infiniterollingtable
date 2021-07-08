// 引入mockjs
const Mock = require("mockjs");

import GetSedimentWarningData from './data/GetSedimentWarningData.json'
import poumiantuline2 from './data/poumiantuline2.json'



// Mock.mock( url, post/get , 返回的数据)；

Mock.mock("/api/GetSedimentWarningData", "post", GetSedimentWarningData);
Mock.mock("/api/poumiantuline2", "post", poumiantuline2);