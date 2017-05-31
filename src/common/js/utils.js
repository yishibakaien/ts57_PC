/**
 * @param  {date} Date 类型
 * @param  {fmt} 格式化格式 如 'yyyy-MM-dd hh:mm' -> 2017-04-20 13:47
 *                              'yyyy/MM/dd hh:mm' -> 2017/04/20 13:47
 *                              'yyyy年MM月dd' -> 2017年04月20日
 * @return {String} 返回格式化的 时间字符串
 */
export const formatDate = (date, fmt) => {
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
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
        ? str
        : _padLeftZero(str));
    }
  }
  return fmt;

  function _padLeftZero(str) {
    return ('00' + str).substr(str.length);
  }
};
// 对象字符串转成对象
export const parseText = (str) => {
  if (str.startsWith('{') || str.startsWith('[')) {
    str = str.replace(/'/g, '"');
    str = str.replace(/(\s?\{\s?)(\S)/g, '$1' + '"' + '$2');
    str = str.replace(/(\s?,\s?)(\S)/g, '$1' + '' +
        '$2');
    str = str.replace(/(\S\s?):(\s?\S)/g, '$1' + '":' + '$2');
    str = str.replace(/,'\{/g, ',{');
    str = str.replace(/""/g, '"');
    str = str.replace(/\s/g, '');
    try {
      str = JSON.parse(str);
    } catch (e) {
      console.log(e);
    }
  }
  return str;
};
// 判断是否对象
export const isObject = (arg) => {
  return typeof arg === 'object' && arg !== null;
};

// 根据key值获取对应的cookie
export const getCookie = (key) => {
  var data = document.cookie;
  var startIndex = data.indexOf(key + '=');
  if (startIndex > -1) {
    startIndex = startIndex + key.length + 1;
    var endIndex = data.indexOf(';', startIndex);
    endIndex = endIndex < 0
      ? data.length
      : endIndex;
    return decodeURIComponent(data.substring(startIndex, endIndex));
  } else {
    return '';
  }
};
// 设置保存cookie
export const setCookie = (key, value, time) => {
  var times = time;
  var cur = new Date();
  cur.setTime(cur.getTime() + time * 24 * 3600 * 1000);
  document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + (times === undefined
    ? ''
    : cur.toGMTString());
};
//  删除Cookie
export const delCookie = (key) => {
  var data = this.get(key);
  if (data !== false) {
    this.set(key, data, -1);
  }
};
//
/**
    * 主要用来合并两个数组，然后拼接成一个对象：各种字典的具体数量&字典合并
    * @param  {[type]} params 传对象
    {
        countObj: num, //获取数量的对象
        countReplace: "count", //countObj需要替换的字符
        dictArr: arr, //字典的json
        dictReplace: "PT"  //dictArr需要替换的字符
    }
    * @return {[type]}        [{label:'面料',value:'1'}]
    */
export const getDictNum = (params) => {
  // Object对象转Map
  function obj2Map(obj) {
    let _map = new Map();
    for (let key of Object.keys(obj)) {
      _map.set(key.replace(params.countReplace, ''), obj[key]);
    }
    return _map;
  }
  return params.dictArr.map(item => {
    return {
      label: item.name,
      value: obj2Map(params.countObj).get(item.code.replace(params.dictReplace, ''))
    };
  });
};
// =============
// 交换数组元素
export const swapItems = (arr, index1, index2) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
};
// 上移数组
export const upMove = (arr, $index) => {
  if ($index === 0) {
    return;
  }
  return swapItems(arr, $index, $index - 1);
};
// 下移数组
export const downMove = (arr, $index) => {
  if ($index === arr.length - 1) {
    return;
  }
  return swapItems(arr, $index, $index + 1);
};
export default {
  formatDate
};
// =============
// 按钮状态
export const btnStatus = (el, btnText) => {
  let s = 60;
  const obj = el.target;
  const timer = setInterval(() => {
    s--;
    obj.disabled = true;
    obj.style.background = '#cccccc';
    obj.innerText = btnText + '(' + s + ')';
    if (s === -1) {
      clearInterval(timer);
      obj.disabled = false;
      obj.style.background = '#4c93fd';
      obj.innerText = '获取验证码';
      s = 60;
    }
  }, 1000);
};
// ========
// 合成&下载图片
/**
 * 获取mimeType
 * @param  {String} type the old mime-type
 * @return the new mime-type
 */
export const _fixType = (type) => {
  type = type.toLowerCase().replace(/jpg/i, 'jpeg');
  var r = type.match(/png|jpeg|bmp|gif/)[0];
  return 'image/' + r;
};
/**
 * 在本地进行文件保存
 * @param  {String} data     要保存到本地的图片数据
 * @param  {String} filename 文件名
 */
export const saveFile = (data, filename) => {
  var savelink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  savelink.href = data;
  savelink.download = filename;
  var event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  savelink.dispatchEvent(event);
};
