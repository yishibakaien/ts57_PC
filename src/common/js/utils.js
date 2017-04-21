/**
 * @param  {date} Date 类型
 * @param  {fmt} 格式化格式 如 'yyyy-MM-dd hh:mm' -> 2017-04-20 13:47
 *                              'yyyy/MM/dd hh:mm' -> 2017/04/20 13:47
 *                              'yyyy年MM月dd' -> 2017年04月20日
 * @return {String} 返回格式化的 时间字符串
 */
function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : _padLeftZero(str));
        }
    }
    return fmt;

    function _padLeftZero(str) {
        return ('00' + str).substr(str.length);
    }
}

export default {
  formatDate
};
