// 正则是用来做字符串匹配的利器，很难，规则太多了
export function formatDate(date, fmt) {
  // 1.get year
  if (/(y+)/.test(fmt)) {
    // date.getFullYear() + ''数字转化成字符串 ；substr(4-RegExp.$1.length) 从左到右截取位数
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  // 2.get others
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "m+": date.getHours(),
    "h+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
