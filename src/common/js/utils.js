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
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : _padLeftZero(str));
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
	// 获取cookie
	var data = document.cookie;
	// 获取key第一次出现的位置    pwd=
	var startIndex = data.indexOf(key + '=');
	//  name=123;pwd=abc
	// 如果开始索引值大于0表示有cookie
	if (startIndex > -1) {
		// key的起始位置等于出现的位置加key的长度+1
		startIndex = startIndex + key.length + 1;
		// 结束位置等于从key开始的位置之后第一次;号所出现的位置
		var endIndex = data.indexOf(';', startIndex);
		// 如果未找到结尾位置则结尾位置等于cookie长度，之后的内容全部获取
		endIndex = endIndex < 0 ? data.length : endIndex;
		return decodeURIComponent(data.substring(startIndex, endIndex));
	} else {
		return '';
	}
};
// 设置保存cookie
export const setCookie = (key, value, time) => {
	// 默认保存时间
	var times = time;
	// 获取当前时间
	var cur = new Date();
	// 设置指定时间
	// 24 * 3600 * 1000 一日的毫秒数
	cur.setTime(cur.getTime() + time * 24 * 3600 * 1000);
	// 创建cookie  并且设置生存周期为GMT时间
	document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + (times === undefined ? '' : cur.toGMTString());
};
//  删除Cookie
export const delCookie = (key) => {
	// 获取cookie
	var data = this.get(key);
	// 如果获取到cookie则重新设置cookie的生存周期为过去时间
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
        countRelace: "count", //countObj需要替换的字符
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
			_map.set(key.replace(params.countRelace, ''), obj[key]);
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

// 按钮状态
export const btnStatus = (el, btnText) => {
	let s = 5;
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
			s = 5;
		}
	}, 1000);
};
