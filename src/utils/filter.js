import moment from 'moment'//导入文件
/**
 * @param {String} data
 * @returns {Number}
 */
export function getIntNumber(data) {
  return parseInt(data)
}

/**
 * @param {Number} data
 * @returns {String}
 */
export function getTime(date) {
    //let date = new Date();
    let Time = moment(date).format("HH:mm:ss");
    let DateTime =moment(date).format("YYYY-MM-DD HH:mm:ss");
    let DateTimeAdd2 = moment().add(2,'hours').format('YYYY-MM-DD HH:mm:ss');
    let DateSubtract5days = moment().subtract(5, 'days').format('YYYY-MM-DD');
    let DateSubtract5hours = moment().subtract(2, 'hours').format('HH:mm:ss');
    let hh =  moment(date).format('HH');
    let mm =  moment(date).format('mm');
    let ss =moment(date).format('ss');
    let year =  moment(date).format('YYYY');
    let month =  moment(date).format('MM');
    let day= moment(date).format('DD');
    let TimeObject={Time,DateTime,DateTimeAdd2,DateSubtract5days,DateSubtract5hours,hh,mm,ss,year,month,day}
  return TimeObject
}