//>>built
(function(b,a){"object"===typeof exports&&"undefined"!==typeof module&&"function"===typeof require?a(require("../moment")):"function"===typeof define&&define.amd?define("moment/locale/ja",["../moment"],a):a(b.moment)})(this,function(b){return b.defineLocale("ja",{months:"1\u6708 2\u6708 3\u6708 4\u6708 5\u6708 6\u6708 7\u6708 8\u6708 9\u6708 10\u6708 11\u6708 12\u6708".split(" "),monthsShort:"1\u6708 2\u6708 3\u6708 4\u6708 5\u6708 6\u6708 7\u6708 8\u6708 9\u6708 10\u6708 11\u6708 12\u6708".split(" "),
weekdays:"\u65e5\u66dc\u65e5 \u6708\u66dc\u65e5 \u706b\u66dc\u65e5 \u6c34\u66dc\u65e5 \u6728\u66dc\u65e5 \u91d1\u66dc\u65e5 \u571f\u66dc\u65e5".split(" "),weekdaysShort:"\u65e5\u6708\u706b\u6c34\u6728\u91d1\u571f".split(""),weekdaysMin:"\u65e5\u6708\u706b\u6c34\u6728\u91d1\u571f".split(""),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY\u5e74M\u6708D\u65e5",LLL:"YYYY\u5e74M\u6708D\u65e5 HH:mm",LLLL:"YYYY\u5e74M\u6708D\u65e5 HH:mm dddd",l:"YYYY/MM/DD",ll:"YYYY\u5e74M\u6708D\u65e5",
lll:"YYYY\u5e74M\u6708D\u65e5 HH:mm",llll:"YYYY\u5e74M\u6708D\u65e5 HH:mm dddd"},meridiemParse:/\u5348\u524d|\u5348\u5f8c/i,isPM:function(a){return"\u5348\u5f8c"===a},meridiem:function(a,b,c){return 12>a?"\u5348\u524d":"\u5348\u5f8c"},calendar:{sameDay:"[\u4eca\u65e5] LT",nextDay:"[\u660e\u65e5] LT",nextWeek:"[\u6765\u9031]dddd LT",lastDay:"[\u6628\u65e5] LT",lastWeek:"[\u524d\u9031]dddd LT",sameElse:"L"},dayOfMonthOrdinalParse:/\d{1,2}\u65e5/,ordinal:function(a,b){switch(b){case "d":case "D":case "DDD":return a+
"\u65e5";default:return a}},relativeTime:{future:"%s\u5f8c",past:"%s\u524d",s:"\u6570\u79d2",ss:"%d\u79d2",m:"1\u5206",mm:"%d\u5206",h:"1\u6642\u9593",hh:"%d\u6642\u9593",d:"1\u65e5",dd:"%d\u65e5",M:"1\u30f6\u6708",MM:"%d\u30f6\u6708",y:"1\u5e74",yy:"%d\u5e74"}})});