/*
 * @Author       : yanqun
 * @Date         : 2020-07-30 13:53:23
 * @Description  : 
 */

export function formatTime(time, format) {
  let currentFormat = format || 'yyyy-MM-dd HH:mm:ss'
  let date = new Date(time)
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'f+': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(currentFormat)) {
    currentFormat = currentFormat.replace(RegExp.$1, (String(date.getFullYear())).substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(currentFormat)) {
      currentFormat = currentFormat.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr((String(o[k])).length)));
    }
  }
  return currentFormat;
}

export function formatDateRange(timeArr, format = 'yyyy-MM-dd HH:mm:ss') {
  if (!Array.isArray(timeArr)) {
    throw new Error('formatDateRange function argument is not an Date Array')
  }
  if (!(timeArr[0] instanceof Date) || !(timeArr[1] instanceof Date)) {
    throw new Error('formatDateRange function argument is not an Date Array')
  }
  let startTime = timeArr[0].getTime()
  let EndTime = timeArr[1].getTime() + (1000 * 60 * 60 * 24 - 1)
  return [
    formatTime(startTime, format),
    formatTime(EndTime, format)
  ]
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  /* eslint no-div-regex: "off" */
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

export function obj2params(object) {
  let params = '';
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      params += '&' + key + '=' + object[key]
    }
  }
  return params.slice(1)
}

